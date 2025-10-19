
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();

    const navHome = ()=> navigate("/home")
    return (
        <header>
            <h2>Travel Factory©️</h2>
            <button onClick={navHome}>Home</button>
        </header>
    )
}
export default Header;