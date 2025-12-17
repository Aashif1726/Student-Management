// AppLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./AppLayout.css";
import Dashboard from "./Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Button, Checkbox, FormControlLabel, SpeedDial, SpeedDialAction, SpeedDialIcon, Switch, Tooltip,Menu,MenuItem } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBot from "react-chatbotify"
import MessageIcon from '@mui/icons-material/Message';
import PrintIcon from '@mui/icons-material/Print';


const AppLayout = () => {
  const hanldeMessage =()=>{
    window.location.href="mailto:aashif2606@gmail.com"
  }
  const handlePrint =()=>{
    window.print()
  }
   
  return (
    <div className="app-layout">
      <SideBar />
      <main className="app-content">
        <Outlet/>
        <div style={{float:"right"}}>
           <Button><Tooltip title="notifications"><Badge badgeContent={1} color="error" variant="dot"> <NotificationsIcon/></Badge></Tooltip></Button>
          {/* <Button><Tooltip title="settings"><SettingsIcon/></Tooltip></Button> */}
           {/* <FormControlLabel control={<Switch />} /> */}
       </div>
       {/* <ChatBot/> */}
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
