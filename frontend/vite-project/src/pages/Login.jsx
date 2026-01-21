import { useState } from "react";
import { loginUser } from "../auth/authService";

function Login({ setAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await loginUser(username, password);
            setAuth(true);
        } catch (error) {
            alert("Invalid Username Or Password");
        }
    };

    return (
        <div>

            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={handleLogin}>Login</button>

        </div>

    );



}

export default Login;