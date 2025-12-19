import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "./AppLayout.css";
import { Avatar, Typography, Switch, styled, Tooltip, Box, Button } from "@mui/material";
import { useAuth } from "./utils/Auth";

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  const handleDarkModeChange = (e) => {
    setDarkMode(e.target.checked);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/login"); 
  };

  const IconSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(0px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(28px)",
        "& .MuiSwitch-thumb:before": { content: '"🌙"' },
        "& + .MuiSwitch-track": { backgroundColor: "#121212" },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#fff",
      width: 32,
      height: 32,
      "&:before": {
        content: '"☀️"',
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: 20 / 2,
      backgroundColor: "#ccc",
      opacity: 1,
    },
  }));

  const username = auth?.user?.username || "Guest";
  const initials = username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="app-layout">
      <SideBar />
      <main className="app-content">
        {/* Top-right user info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
            mb: 2,
          }}
        >
           <Tooltip title="Toggle Dark Mode">
            <IconSwitch checked={darkMode} onChange={handleDarkModeChange} />
          </Tooltip>
          <Tooltip title={username}>
            <Avatar sx={{ width: 40, height: 40 }}>{initials}</Avatar>
          </Tooltip>
        
         
         
        </Box>

        
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
