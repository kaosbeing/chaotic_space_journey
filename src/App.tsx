import "./assets/css/main.css";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import SpaceTraders from './SpaceTraders';
import Sidebar from './Components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { DashboardContextProvider } from "./Context/dashboard/DashboardContextProvider";

/* Interfaces */
import { FleetData } from './Models/ShipInterface';
import { AgentData } from './Models/AgentInterface';

function App() {
	const navigate = useNavigate();

	if (!SpaceTraders.token || SpaceTraders.token.length == 0) {
		navigate('/login');
	}

	const [userData, setUserData] = useState<AgentData | null>(null);
	const [fleetData, setFleetData] = useState<FleetData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await SpaceTraders.getUser();
				setUserData(user);

				const fleet = await SpaceTraders.getFleet();
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
