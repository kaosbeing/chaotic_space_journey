import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';
import ApiHandler from '../../ApiHandler';

interface AuthContextProviderProps {
    children: ReactElement;
}

export function AuthContextProvider({ children }: Readonly<AuthContextProviderProps>) {
    const [token, setToken] = useState<string>(localStorage.getItem("agent-token") ?? "");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (token && token.length != 0) {
            setIsLoggedIn(true);
        }
    }, [token])

    // Get agent using token in arguments
    async function login(token: string): Promise<void> {
        try {
            const response = await ApiHandler.getAgent(token);
            if (response) {
                localStorage.setItem("agent-token", token);
                setToken(token);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    function logout(): void {
        setToken("");
        localStorage.removeItem("agent-token");
        ApiHandler.token = "";
        navigate('/login');
    }

    return <AuthContext.Provider value={{ token, isLoggedIn, login, logout, }}>
        {children}
    </AuthContext.Provider>;
}