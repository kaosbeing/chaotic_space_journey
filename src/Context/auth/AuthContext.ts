import { createContext } from 'react';

interface AuthData {
    token: string | null,
    isLoggedIn: boolean,
    login: (token: string) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthData>({
    token: null,
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});