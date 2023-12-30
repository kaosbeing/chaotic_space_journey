import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';
import SpaceTraders from '../../SpaceTraders';

interface AuthContextProviderProps {
    children: ReactElement;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("agent-token"));

    const navigate = useNavigate();

    // Get agent using token in arguments
    async function login(token: string): Promise<void> {
        const url = 'https://api.spacetraders.io/v2/my/agent';
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!data.error) {
                localStorage.setItem("agent-token", token);
                SpaceTraders.token = token;
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    function logout(): void {
        setToken(null);
        localStorage.removeItem("agent-token");
        SpaceTraders.token = null;
        navigate('/login');
    }

    return <AuthContext.Provider value={{ token, login, logout, }}>
        {children}
    </AuthContext.Provider>;
}