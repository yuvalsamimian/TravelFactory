
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DisplayUserVacations() {
  const { userId } = useParams();
  const [requests, setRequests] = useState<any[]>([]);

  // Show date in noraml format
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(iso));

    //Featch for the requests
  useEffect(() => {
    if (!userId) return;
    const fetchRequests = async () => {
      const res = await axios.get(`http://localhost:4000/api/userRequests/${userId}`);
      setRequests(res.data);
    };
    fetchRequests();
  }, [userId]);

  return (
    <div>
      <h2>Requests for user {userId}</h2>
      {requests.length === 0 ? (
        <div>No requests found.</div>
      ) : (
        <ul>
          {requests.map((r) => (
            <li key={r.request_id}>
              {fmt(r.start_date)} → {fmt(r.end_date)} ({r.status})
              {r.comments ? ` — ${r.comments}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayUserVacations;
