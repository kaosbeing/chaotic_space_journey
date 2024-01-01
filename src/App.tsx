import "./css/main.css";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import ApiHandler from './ApiHandler';
import Sidebar from './Components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';

/* Interfaces */
import { Ship } from './Models/ShipInterface';
import { Agent } from './Models/AgentInterface';

function App() {
	const navigate = useNavigate();

	if (!ApiHandler.token || ApiHandler.token.length == 0) {
		navigate('/login');
	}

	const [userData, setUserData] = useState<Agent | null>(null);
	const [fleetData, setFleetData] = useState<Ship[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await ApiHandler.getUser();
				setUserData(user);

				const fleet = await ApiHandler.getFleet();
				setFleetData(fleet);

			} catch (error) {
				console.error('Error fetching some data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<Sidebar user={userData} fleet={fleetData} />
			<Outlet></Outlet>
		</>
	)
}

export default App;
