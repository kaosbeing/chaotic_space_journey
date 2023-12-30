import "./sidebar.css";
import { Agent } from '../../Models/AgentInterface';
import { Ship } from '../../Models/ShipInterface';
import Fleet from '../fleet/fleet';
import User from '../user/user';
import logo from "/assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth/AuthContext";

const Sidebar = ({ user, fleet }: { user: Agent | null, fleet: Ship[] | null }) => {
    const authContext = useContext(AuthContext);

    return (
        <div className='sideBar'>
            <div className="hero">
                <img className="hero__img" src={logo} alt="" />
                <div className="hero__title">
                    <span className="hero__title--main">Chaotic</span>
                    <span className="hero__title--sub">Space Journey</span>
                </div>
            </div>
            <Fleet fleet={fleet} />
            <User user={user} />
            <button onClick={() => { authContext.logout() }} className="logout">Log out</button>
        </div>
    );
};

export default Sidebar;