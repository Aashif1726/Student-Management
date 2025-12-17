// AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./AppLayout.css";
import Dashboard from "./Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Button, Tooltip } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBot from "react-chatbotify"

const AppLayout = () => {
  return (
    <div className="app-layout">
      <SideBar />
      <main className="app-content">
        <Outlet/>
        <div style={{float:"right"}}>
           <Button style={{color:"#4040a1"}}><Tooltip title="notifications"><Badge badgeContent={1} color="error" variant="dot"> <NotificationsIcon/></Badge></Tooltip></Button>
          <Button style={{color:"#4040a1"}}><Tooltip title="settings"><SettingsIcon/></Tooltip></Button>
           
       </div>
       {/* <ChatBot/> */}
      </main>
    </div>
  );
};

export default AppLayout;
