// AppLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./AppLayout.css";
import Dashboard from "./Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Button, Checkbox, FormControlLabel, SpeedDial, SpeedDialAction, SpeedDialIcon, Switch, Tooltip,Menu,MenuItem,styled } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBot from "react-chatbotify"
import MessageIcon from '@mui/icons-material/Message';
import PrintIcon from '@mui/icons-material/Print';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';


const AppLayout = () => {
  const hanldeMessage =()=>{
    window.location.href="mailto:aashif2606@gmail.com"
  }
  const handlePrint =()=>{
    window.print()
  }
  const [checked,isChecked] =useState(false)

  useEffect(()=>{
       document.body.style.backgroundColor=checked? "#000" :"#fff";
       document.body.style.color=checked?"#fff":"#000";
  },[checked])

  

  const handleChange =(e)=>{
    isChecked(e.target.checked)
  }

  //Dark Mode

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
      "& .MuiSwitch-thumb:before": {
        content: '"🌙"', 
      },
      "& + .MuiSwitch-track": {
        backgroundColor: "#121212",
      },
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
   
  return (
    <div className="app-layout">
      <SideBar />
      <main className="app-content">
       
        <div style={{float:"right"}}>

          <IconSwitch checked={checked} onChange={handleChange} />
            
           {/* <WbSunnyRoundedIcon color="primary"/> <FormControlLabel  control={<Switch/>} checked={checked}  onChange={handleChange} sx={{width:"25px"}} /> <DarkModeRoundedIcon color="primary" /> */}
           <Button><Tooltip title="help center"> <HelpRoundedIcon/></Tooltip></Button>
           <Button><Tooltip title="notifications"><Badge badgeContent={1} color="error" variant="dot"> <NotificationsIcon/></Badge></Tooltip></Button>
          {/* <Button><Tooltip title="settings"><SettingsIcon/></Tooltip></Button> */}
           {/* <FormControlLabel control={<Switch />} /> */}
       </div>
       {/* <ChatBot/> */}
        <Outlet/>
      </main>
          <SpeedDial ariaLabel="speed dial" 
          sx={{position:"absolute",bottom:16,right:16}} 
          icon={<SpeedDialIcon/>}>
            <SpeedDialAction icon={<MessageIcon/>} tooltipTitle="Message"  onClick={hanldeMessage}/>
            <SpeedDialAction icon={<PrintIcon/>} tooltipTitle="print" onClick={handlePrint} />
          </SpeedDial>
     

    </div>
  );
};

export default AppLayout;
