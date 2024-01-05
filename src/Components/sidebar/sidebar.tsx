import "./sidebar.css";
import User from '../user/user';
import logo from "/assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth/AuthContext";
import { Link } from "react-router-dom";
import SidebarShip from "../sidebarShip/sidebarShip";

import chevron from "/assets/icons/chevron_right.svg";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";

const Sidebar = () => {
    const authContext = useContext(AuthContext);
    const STContext = useContext(SpacetradersContext);

    return (
        <div className='sideBar'>
            <div className="hero">
                <img className="hero__img" src={logo} alt="" />
                <div className="hero__title">
                    <span className="hero__title--main">Chaotic</span>
                    <span className="hero__title--sub">Space Journey</span>
                </div>
            </div>
            <Link to={"/fleet"} className="full_fleet">
                <span>View fleet</span>
                <img src={chevron} />
            </Link>
            {STContext.fleet ? (
                <div className="fleet">
                    {STContext.fleet.map((ship) => (
                        <SidebarShip key={ship.symbol} ship={ship}></SidebarShip>
                    ))}
                </div>
            ) : (
                <div className="fleet loading">
                    <div className="loader"></div>
                </div>
            )}
            <User user={STContext.agent} />
            <button onClick={() => { authContext.logout() }} className="logout">Log out</button>
        </div>
    );
};

export default Sidebar;