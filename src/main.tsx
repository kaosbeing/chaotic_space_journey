import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import LoginPage from './Components/login/Login.tsx';
import { AuthContextProvider } from './Context/auth/AuthContextProvider.tsx';
import Dashboard from './Components/dashboard/dashboard.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="/fleet/:shipSymbol" element={<Dashboard />}></Route>
						<Route path="/fleet" element={<Dashboard />}></Route>
					</Route>
					<Route path="/login" element={<LoginPage />}></Route>
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
