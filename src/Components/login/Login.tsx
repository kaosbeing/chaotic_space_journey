import "../../assets/css/main.css";
import "./login.css"
import logo from "../../assets/logo.svg"
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../Context/auth/AuthContext";

function LoginPage() {
    const authContext = useContext(AuthContext);
    const [token, setToken] = useState('');

    function login(e: FormEvent) {
        e.preventDefault();
        authContext.login(token);
    }

    return (
        <>
            <div className="login">
                <div className="login__hero">
                    <img src={logo} className="login__logo" />
                    <h1 className="login__title">Chaotic Space Traders</h1>
                </div>
                <form className="login__form" onSubmit={login}>
                    <input onInput={(e) => { setToken((e.target as HTMLTextAreaElement).value) }} type="text" className="login__textInput" name="token" placeholder="Token" />
                    <button className="login__submit">Connexion</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;
