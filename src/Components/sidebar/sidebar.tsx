import "./sidebar.css";
import { Agent } from '../../Models/AgentInterface';
import { Ship } from '../../Models/ShipInterface';
import Fleet from '../fleet/fleet';
import User from '../user/user';

const Sidebar = ({ user, fleet }: { user: Agent | null, fleet: Ship[] | null }) => {
    return (
        <div className='sideBar'>
            <User user={user} />
            <Fleet fleet={fleet} />
        </div>
    );
};

export default Sidebar;