import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const navToRequesters = () => navigate("/requests");
  const navToValidators = () => navigate("/validators");

  return (
    <div className="home-container">
      <h1>Welcome to the Vacation Request System of TravelFactory</h1>

      <p>
        By clicking on the <strong>Request</strong> button, you can select your
        name and submit a new vacation request.  
        You can also view the current status of your existing requests.
      </p>

      <p>
        For managers, by clicking on the <strong>Approvals</strong> button, you
        can approve or reject vacation requests, as well as view which ones are
        pending, approved, or rejected.
      </p>

      <p>Please click the button that fits your role!</p>

      <div className="home-buttons">
        <button className="home-btn" onClick={navToRequesters}>
          Vacation Request
        </button>
        <button className="home-btn secondary" onClick={navToValidators}>
          Approvals
        </button>
      </div>
    </div>
  );
}

export default Home;
