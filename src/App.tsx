import "./assets/css/main.css";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import SpaceTraders, { token } from './SpaceTraders';
import Sidebar from './Components/sidebar';

/* Interfaces */
import { FleetData } from './Models/ShipInterface';
import { AgentData } from './Models/AgentInterface';

function App() {
	const navigate = useNavigate();

	if (!token) {
		navigate('/login');
	}
	const [userData, setUserData] = useState<AgentData | null>(null);
	const [fleetData, setFleetData] = useState<FleetData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await SpaceTraders.getUser();
				setUserData(user);
				console.log(user);


				const fleet = await SpaceTraders.getFleet();
				setFleetData(fleet);
				console.log(fleet);

			} catch (error) {
				console.error('Error fetching some data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<Sidebar user={userData} fleet={fleetData} />
		</>
	)
}

export default App;
