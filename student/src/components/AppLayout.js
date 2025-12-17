// AppLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./AppLayout.css";
import Dashboard from "./Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Button, Checkbox, FormControlLabel, Switch, Tooltip } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBot from "react-chatbotify"


const AppLayout = () => {
  return (
    <div className="app-layout">
      <SideBar />
      <main className="app-content">
        <Outlet/>
        <div style={{float:"right"}}>
           <Button><Tooltip title="notifications"><Badge badgeContent={1} color="error" variant="dot"> <NotificationsIcon/></Badge></Tooltip></Button>
          <Button><Tooltip title="settings"><SettingsIcon/></Tooltip></Button>
           {/* <FormControlLabel control={<Switch />} /> */}
       </div>
       {/* <ChatBot/> */}
      </main>


    </div>
  );
};

export default AppLayout;
