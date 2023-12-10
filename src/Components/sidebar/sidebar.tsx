import "./sidebar.css";
import { AgentData } from '../../Models/AgentInterface';
import { FleetData } from '../../Models/ShipInterface';
import Fleet from '../fleet/fleet';
import User from '../user/user';

interface SidebarProps {
    user: AgentData | null;
    fleet: FleetData | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user, fleet }) => {
    if (!user || !fleet) {
        return <div className='sideBar'>Loading...</div>;
    }

    return (
        <div className='sideBar'>
            <User user={user} />
            <Fleet fleet={fleet} />
        </div>
    );
};

export default Sidebar;