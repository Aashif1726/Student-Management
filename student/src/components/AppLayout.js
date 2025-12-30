import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "./AppLayout.css";
import { Avatar, Typography, Switch, styled, Tooltip, Box, Button ,Popover} from "@mui/material";
import { useAuth } from "./utils/Auth";
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  const logoutToast = ()=>{
    toast("Logout Successfully",{
      className:"custom-toast"
    })
  }

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

  const username = auth?.user?.username || ""
  const initials = username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();


    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  


  return (
    <div className="app-layout">
      <SideBar />
      <main className="app-content">
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
         <Button sx={{width:"40px",height:"40px",borderRadius:"50%",background:"none"}} aria-describedby={id}  onClick={handleClick}> <Avatar sx={{ width: 40, height: 40 }}>{initials}</Avatar></Button> 
          </Tooltip>
          
         <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <button style={{background:"transparent"}} onClick={handleLogout}><LogoutIcon sx={{color:"red"}}/> <Typography variant="p" sx={{color:"red",padding:"5px",textAlign:"center"}}>Log Out</Typography></button>
      </Popover>
         
         
        </Box>

        
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
