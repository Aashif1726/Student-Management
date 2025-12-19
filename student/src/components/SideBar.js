import React from 'react'
import { NavLink } from 'react-router-dom'
import {Divider} from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';

function SideBar() {
    return (
        <>
          <div style={{width:"150px",height:"100vh",backgroundColor:"#4040a1",borderRadius:"0 50px 50px 0"}}> &nbsp;
            <center>
            <img src='https://png.pngtree.com/png-vector/20220906/ourmid/pngtree-graduating-student-icon-design-outline-color-style-vector-laptop-people-vector-png-image_39093260.png' style={{width:"60px",height:"60px",padding:"12px",border:"1px solid black",borderRadius:"50%",backgroundColor:"#fff"}} />
             </center>
             <br/>  
                <nav>
                    <NavLink to="/"> <HomeRoundedIcon/>&nbsp;<p style={{padding:"4px"}}>Home</p></NavLink>
                    <NavLink to="/stud"><SchoolRoundedIcon/>&nbsp;<p style={{padding:"4px"}}>Students</p></NavLink>                
                    <NavLink to="/staffs"><PeopleAltRoundedIcon/>&nbsp;<p style={{padding:"4px"}}>Staffs</p></NavLink>                 
                    <NavLink to="/attendance"><AutoStoriesRoundedIcon/>&nbsp;<p style={{padding:"4px"}}>Attendance</p></NavLink>                
                    <NavLink to="/courses"><LibraryBooksRoundedIcon/>&nbsp;<p style={{padding:"4px"}}>Courses</p></NavLink>                
                    {/* <NavLink to="/profile"><AccountCircleRoundedIcon/>&nbsp;<p style={{padding:"4px"}}>Profile</p></NavLink>               */}
                    {/* <NavLink to="/logout"><PowerSettingsNewRoundedIcon/>&nbsp;<p style={{padding:"4px"}}>Logout</p></NavLink>                  */}
                </nav>


          </div>
        </>
    )
}

export default SideBar
