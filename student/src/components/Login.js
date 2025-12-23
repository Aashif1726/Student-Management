import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './utils/Auth';
import { toast, ToastContainer, Zoom } from "react-toastify";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Get previous path or fallback to home
  const redirectPath = location.state?.from?.pathname || "/";

  const successToast = () => {
    toast.success("Login Successfully", {
      className: "custom-toast"
    });
  };

  useEffect(()=>{
       document.body.style.backgroundColor="#fff"
       document.body.style.color="#000"
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { username, password }
      );

      console.log(response.data);

      
      auth.login(username);
    //   localStorage.setItem("user", JSON.stringify({ username }));

      setError('');
      successToast();

      
      navigate(redirectPath, { replace: true });

    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="https://wpusermanager.com/content/uploads/2023/08/custom-login-page.png" alt="Login" className="login-image" />
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
          <br /><br />
        
        </form>

        {error && <p className="error-msg">{error}</p>}
      </div>

    
    </div>
  );
}

export default Login;
