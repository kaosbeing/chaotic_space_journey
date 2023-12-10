import { useContext } from "react";
import Cooldown from "../cooldown/cooldown";
import { DashboardContext } from "../../Context/dashboard/DashboardContext";

import "./dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Cooldown></Cooldown>
        </div>
    )
}

export default Dashboard;