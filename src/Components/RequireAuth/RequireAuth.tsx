import { ReactElement, useContext } from "react";
import { AuthContext } from "../../Context/auth/AuthContext";
import LoginPage from "../login/Login";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }: { children: ReactElement }) => {
    const authCTX = useContext(AuthContext)

    if (!authCTX.isLoggedIn) {
        return <LoginPage />;
    }
    return children;
};

export default RequireAuth;