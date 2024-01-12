import "./css/main.css";
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import ApiHandler from './ApiHandler';
import Sidebar from './Components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';

/* Interfaces */
import { AuthContext } from "./Context/auth/AuthContext";
import { SpacetradersContext } from "./Context/spacetraders/SpacetradersContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const authContext = useContext(AuthContext);
	const STContext = useContext(SpacetradersContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await ApiHandler.getAgent(authContext.token);
				if (user) {
					STContext.updateAgent(user);
				}

				const fleet = await ApiHandler.getFleet(authContext.token);
				if (fleet) {
					STContext.updateFleet(fleet);
				}
			} catch (error) {
				console.error('Error fetching some data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				theme="dark"
			/>
			<Sidebar />
			<Outlet></Outlet>
		</>
	)
}

export default App;
