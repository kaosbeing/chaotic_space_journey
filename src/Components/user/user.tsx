import { Agent } from '../../Models/AgentInterface';
import "./user.css";
import hqIcon from "/assets/icons/headquarters.svg";
import factionIcon from "/assets/icons/faction.svg";
import creditIcon from "/assets/icons/credits.svg";
import fleetIcon from "/assets/icons/ship.svg";

interface UserComponentProps {
	user: Agent | null;
}

const User: React.FC<UserComponentProps> = ({ user }) => {
	return (
		<>
			{user ? (
				<div className='user'>
					<h3 className='user__symbol'>{user.symbol}</h3>
					<div className='user__infos'>
						<div className='user__creditsWrapper'>
							<img className='user__creditIcon' src={creditIcon} alt="credits" />
							<span className='user__credits'>{user.credits}</span>
						</div>
						<div className='user__fleetWrapper'>
							<img className='user__fleetIcon' src={fleetIcon} alt="credits" />
							<span className='user__shipCount'>{user.shipCount}</span>
						</div>
						<div className='user__factionWrapper'>
							<img className='user__factionIcon' src={factionIcon} alt="credits" />
							<span className='user__faction'>{user.startingFaction}</span>
						</div>
						<div className='user__hqWrapper'>
							<img className='user__hqIcon' src={hqIcon} alt="credits" />
							<span className='user__headquarters'>{user.headquarters}</span>
						</div>
					</div>
				</div>
			) : (
				<div className='user loading'>
					<div className='loader'></div>
				</div>
			)}
		</>
	);
};

export default User;