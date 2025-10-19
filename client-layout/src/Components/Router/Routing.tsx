import { Route,Routes } from "react-router-dom";
import Home from "../Home/Home";
import RequestVacation from "../Requests/RequestVacation";
import DisplayUserVacations from "../Requests/DisplayUserVacations";
import AllRequests from "../Validators/AllRequests";

function Routing(){
    return (
        <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/home" element={<Home />}/>
         <Route path="/requests" element={<RequestVacation />}/>
         <Route path="/validators" element={<AllRequests />}/>
         <Route path="/userVacations/:userId" element={<DisplayUserVacations />}/>
        </Routes>
    )
}
export default Routing;