import { createContext } from 'react';

interface AuthData {
    token: string,
    isLoggedIn: boolean,
    login: (token: string) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthData>({
    token: "",
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});