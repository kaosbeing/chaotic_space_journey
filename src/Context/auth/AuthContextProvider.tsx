import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';

interface AuthContextProviderProps {
    children: ReactElement;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("agent-token"));

    const navigate = useNavigate();

    // Get agent using token in arguments
    async function login(token: string): Promise<void> {
        localStorage.setItem("agent-token", token);
        navigate('/');
    };

    function logout(): void {
        localStorage.clear();
        setToken(null);
        navigate('/login');
    }

    return <AuthContext.Provider value={
        {
            token,
            login,
            logout,
        }
    }>
        {children}
    </AuthContext.Provider>;
}