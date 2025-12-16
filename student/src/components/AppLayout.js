// AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./AppLayout.css";
import Dashboard from "./Dashboard";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <SideBar />
      <main className="app-content">
        <Outlet/>
       
      </main>
    </div>
  );
};

export default AppLayout;
