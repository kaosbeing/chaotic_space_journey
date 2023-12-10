import { AgentData } from '../../Models/AgentInterface';
import "./user.css";
import credits from "../../assets/icons/credits.svg";

interface UserComponentProps {
	user: AgentData | null;
}

const User: React.FC<UserComponentProps> = ({ user }) => {
	return (
		<>
			{user ? (
				<div className='user'>
					<h3 className='user__symbol'>{user.data.symbol}</h3>
					<div className='user__infos'>
						<span className='user__headquarters'>HQ : {user.data.headquarters}</span>
						<span className='user__faction'>Faction : {user.data.startingFaction}</span>
					</div>
					<div className='user__creditsWrapper'>
						<img className='user__creditsIcon' src={credits} alt="credits" />
						<span className='user__credits'>{user.data.credits}</span>
					</div>
				</div>
			) : (
				<div className='user'>Loading user data...</div>
			)}
		</>
	);
};

export default User;