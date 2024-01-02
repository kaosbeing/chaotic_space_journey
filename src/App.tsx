import "./css/main.css";
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import ApiHandler from './ApiHandler';
import Sidebar from './Components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';

/* Interfaces */
import { AuthContext } from "./Context/auth/AuthContext";
import { SpacetradersContext } from "./Context/spacetraders/SpacetradersContext";

function App() {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	const STContext = useContext(SpacetradersContext);

	if (!authContext.isLoggedIn) {
		navigate('/login');
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await ApiHandler.getAgent(authContext.token);
				STContext.updateAgent(user);

				const fleet = await ApiHandler.getFleet(authContext.token);
				STContext.updateFleet(fleet);
			} catch (error) {
				console.error('Error fetching some data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<Sidebar />
			<Outlet></Outlet>
		</>
	)
}

export default App;
