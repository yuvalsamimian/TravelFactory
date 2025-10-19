
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect,useState } from "react";
import axios from "axios";


function RequestVacation(){
    const [users,setUsers] = useState<any[]>([]);
    const [selectedViewerId, setSelectedViewerId] = useState<string>("");
    const { register,handleSubmit,reset} = useForm();
    const navigate = useNavigate();


    //Get all users and state them when the page is up
    useEffect(()=> {
        const getUsers = async ()=>{
            try{
                const result = await axios.get("http://localhost:4000/api/getUsers");
                const onlyRequesters = result.data.filter((u:any)=>u.role === "requester");
                setUsers(onlyRequesters);
            } catch(err){
                console.log("Error fetching users", err);
            }
        };
        getUsers();
    },[]);

    const onSubmit = async(data:any)=>{
        try{
            const res = await axios.post("http://localhost:4000/api/requestVacation",data);
            alert(res.data.message);
            reset();
        } catch(err:any){
            alert(err.response?.data?.message);
        }
    };


    //Navigate to all specific user requests
      const navToUserVacations = () => {
    if (!selectedViewerId) return;
    navigate(`/userVacations/${selectedViewerId}`);
  };

        return (
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
             <h2>New Vacation Request</h2>
             <p>
             <label>User:</label>
             <select {...register("user_id", {required: true})}>
                <option value="">Select a user</option>
                       {users.map((u: any) => (
          <option key={u.user_id} value={u.user_id}>
            {u.user_id} - {u.user_name}
          </option>
        ))}
             </select>
             </p>
             <p>
             <label>Start Date:</label>
             <input type="date" {...register("start_date", {required:true})} />
</p>

<p>
    <label>
        End Date:
    </label>
    <input type="date" {...register("end_date", {required:true})} />
</p>
<p>
    <label>Reason:</label>
    <input type="text" placeholder="Optional" {...register("reason")} />
</p>
<p>
    <button type="submit">Submit</button>
</p>
            </form>



       <div style={{ marginTop: 24 }}>
        <label style={{ marginRight: 8 }}>Show all my requests: </label>
        <select
          value={selectedViewerId}
          onChange={(e) => setSelectedViewerId(e.target.value)}
          style={{ marginRight: 8 }}
        >
          <option value="">Choose User</option>
          {users.map((u) => (
            <option key={u.user_id} value={u.user_id}>
              {u.user_id} - {u.user_name}
            </option>
          ))}
        </select>

        <button onClick={navToUserVacations} disabled={!selectedViewerId}>
          Show
        </button>
      </div>




        </div>
    )
}
export default RequestVacation;