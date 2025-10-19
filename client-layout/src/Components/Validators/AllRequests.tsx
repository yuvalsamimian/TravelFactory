
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllRequests() {
  const [validators, setValidators] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [selectedValidatorId, setSelectedValidatorId] = useState("");
  const [managerComment, setManagerComment] = useState("");

  //Show date in smaller format
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
      .format(new Date(iso));

      //Featch all users and requsts and state them
  useEffect(() => {
    (async () => {
      try {
        const usersRes = await axios.get("http://localhost:4000/api/getUsers");
        const reqsRes  = await axios.get("http://localhost:4000/api/allRequests");
        setValidators(usersRes.data.filter((u: any) => String(u.role).toLowerCase() === "validator"));
        setRequests(reqsRes.data);
      } catch (e) {
        console.error(e);
        alert("Failed to load data");
      }
    })();
  }, []);


  //Pop up for each request the validator press
  const openDetails = (r: any) => {
    setSelected(r);
    setSelectedValidatorId(r.validator_id ? String(r.validator_id) : "");
    setManagerComment(r.comments || "");
  };

  //Close pop up
  const closeDetails = () => {
    setSelected(null);
    setSelectedValidatorId("");
    setManagerComment("");
  };


//Send the put for the request
  const updateStatus = async (status: "approved" | "rejected") => {
    if (!selected) return;
    try {
      const body = {
        request_id: selected.request_id,
        user_id: selected.user_id,
        start_date: selected.start_date,
        end_date: selected.end_date,
        reason: selected.reason || "",
        status,
        comments: managerComment || null,
        validator_id: selectedValidatorId ? Number(selectedValidatorId) : null,
      };
      await axios.put("http://localhost:4000/api/approveOrReject", body);
      alert(`Request ${status}`);
      //Updated it lockal
      setRequests(prev =>
        prev.map(r => r.request_id === selected.request_id
          ? { ...r, status, comments: body.comments, validator_id: body.validator_id }
          : r
        )
      );
      closeDetails();
    } catch (e: any) {
      console.error(e);
      alert(e.response?.data?.message || "Update failed");
    }
  };


  //Filter the requests
  const filtered = statusFilter
    ? requests.filter(r => String(r.status).toLowerCase() === statusFilter)
    : requests;
  
  const displayName = (u: any) => u?.name ?? u?.user_name ?? `User ${u?.user_id}`;
  const findValidatorName = (id?: number) =>
    id ? displayName(validators.find(v => v.user_id === id)) : "";

  return (
    <div>
      <h2>All Requests</h2>

      <div style={{ margin: "8px 0" }}>
        <label style={{ marginInlineEnd: 8 }}>Filter by status:</label>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div>No requests found.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map(r => (
            <li
              key={r.request_id}
              onClick={() => openDetails(r)}
              style={{ cursor: "pointer", border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 8 }}
              title="Click to view details"
            >
              <div>
                <strong>Request #{r.request_id}</strong> — {fmt(r.start_date)} → {fmt(r.end_date)} ({r.status})
              </div>
              <div>Requester ID: {r.user_id}</div>
              {r.reason && <div>Reason: {r.reason}</div>}
              {r.comments && <div>Manager comment: {r.comments}</div>}
              <div>
                Validator: {r.validator_id ? `${findValidatorName(r.validator_id)} (id ${r.validator_id})` : "—"}
              </div>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
          }}
        >
          <div style={{ background: "#fff", padding: 16, borderRadius: 8, maxWidth: 520, width: "100%" }}>
            <h3>Request #{selected.request_id}</h3>

            <div><b>Dates:</b> {fmt(selected.start_date)} → {fmt(selected.end_date)}</div>
            <div><b>Requester ID:</b> {selected.user_id}</div>
            <div><b>Status:</b> {selected.status}</div>
            {selected.reason && <div><b>Reason:</b> {selected.reason}</div>}
            {selected.comments && <div><b>Existing comment:</b> {selected.comments}</div>}

            <hr />

            <div style={{ marginBottom: 8 }}>
              <label style={{ marginInlineEnd: 8 }}>Validator (optional):</label>
              <select
                value={selectedValidatorId}
                onChange={e => setSelectedValidatorId(e.target.value)}
              >
                <option value="">— None —</option>
                {validators.map(v => (
                  <option key={v.user_id} value={v.user_id}>
                    {v.user_id} — {displayName(v)}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block" }}>Comment (optional):</label>
              <textarea
                rows={3}
                value={managerComment}
                onChange={e => setManagerComment(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => updateStatus("approved")} disabled={selected.status !== "pending"}>
                Approve
              </button>
              <button onClick={() => updateStatus("rejected")} disabled={selected.status !== "pending"}>
                Reject
              </button>
              <button onClick={closeDetails} style={{ marginInlineStart: "auto" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
