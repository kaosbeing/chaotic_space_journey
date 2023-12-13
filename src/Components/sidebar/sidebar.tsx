import "./sidebar.css";
import { AgentData } from '../../Models/AgentInterface';
import { FleetData } from '../../Models/ShipInterface';
import Fleet from '../fleet/fleet';
import User from '../user/user';

const Sidebar = ({ user, fleet }: { user: AgentData, fleet: FleetData }) => {
    return (
        <div className='sideBar'>
            <User user={user} />
            <Fleet fleet={fleet} />
        </div>
    );
};

export default Sidebar;