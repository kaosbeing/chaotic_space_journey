import "./assets/css/main.css";
import { useEffect, useState } from 'react';
import SpaceTraders from './SpaceTraders';
import Sidebar from './Components/sidebar';

/* Interfaces */
import { FleetData } from './Interfaces/SpaceShipInterface';
import { UserData } from './Interfaces/UserInterface';

function App() {
	const [userData, setUserData] = useState<UserData | null>(null);
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
