import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './utils/Auth';
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const successToast = () => {
        toast.success("Login Successfully", {
            className: "custom-toast"
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post(
    "http://localhost:8080/login",
    { username, password }, 
    // { withCredentials: true } 
);

            

            console.log(response.data);
            auth.login(username, password);
            setError('');
            successToast();

            
            navigate('/');
        } catch (err) {
            console.error(err);
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/login-image.png" alt="Login" className="login-image" />
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-msg">{error}</p>}
            </div>
            <ToastContainer
                transition={Bounce}
                draggable={true}
                autoClose={4000}
            />
        </div>
    );
}

export default Login;
