import React from 'react'
import { NavLink } from 'react-router-dom'
import {Divider} from "@mui/material";

function SideBar() {
    return (
        <>
          <div style={{width:"150px",height:"100vh",backgroundColor:"#4040a1"}}> &nbsp;
            <center>
            <img src='https://png.pngtree.com/png-vector/20220906/ourmid/pngtree-graduating-student-icon-design-outline-color-style-vector-laptop-people-vector-png-image_39093260.png' style={{width:"60px",height:"60px",padding:"12px",border:"1px solid black",borderRadius:"50%",backgroundColor:"#fff"}} />
             </center>
             <br/>  
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/students">Students</NavLink>                
                    <NavLink to="/staffs">Staffs</NavLink>                 
                    <NavLink to="/attendance">Attendance</NavLink>                
                    <NavLink to="/courses">Courses</NavLink>                
                    <NavLink to="/profile">Profile</NavLink>              
                    <NavLink to="/logout">Logout</NavLink>                 
                </nav>


          </div>
        </>
    )
}

export default SideBar
