import { createContext } from 'react';

interface AuthData {
    token: string | null,
    login: (token: string) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthData>({
    token: null,
    login: () => { },
    logout: () => { },
});