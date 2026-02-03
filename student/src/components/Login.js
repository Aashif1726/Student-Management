import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/Auth";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f6fa";
    document.body.style.color = "#000";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      auth.login(username);
      toast.success("Login Successfully");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      
    
      <div className="login-left">
        <img
          src="https://img.freepik.com/free-vector/flat-children-back-school_52683-42315.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Login Illustration"
        />
      </div>

     
      <div className="login-right">
        
        <div className="login-card">
          
         

          <h2>Login</h2>
      
         

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
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
      </div>
    </div>
  );
}

export default Login;
