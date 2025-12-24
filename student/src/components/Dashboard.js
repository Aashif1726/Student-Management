import React, { useEffect, useState } from 'react';
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import { CardContent, Tooltip, Typography, Card, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [staffs,setStaffs]= useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/stud", { withCredentials: true })
      .then(res => setStudents(res.data.response))
      .catch(err => toast.error(err.message || "Failed to fetch students"));
  }, []);

  const totalStudents = students.length;

  const totalMarks = students.reduce((sum,s)=>sum + s.marks,0);
  const avgMarks = (totalMarks/students.length).toFixed(2);

  useEffect(()=>{
    axios.get("http://localhost:8080/staffs",{withCredentials:true})
    .then(response=>setStaffs(response.data.response))
    .catch(err=>toast.error(err))
  },[])

  const totalStaffs = staffs.length;

  const totalBranches = new Set(students.map(s=>s.branch)).size;

  return (
    <>
      <Tooltip title="This page shows dashboard details">
        <InfoOutlineRoundedIcon />
      </Tooltip>  
      <span style={{ padding: "4px" }}>
        <b>Dashboard Page</b>
      </span>
      <br /> <br />
  

       
        <th>Total Students <br/> <br/><h2>{totalStudents}</h2></th>
         <th>Total Staffs <br/> <br/><h2>{totalStaffs}</h2></th>
          <th>Total Branches <br/> <br/><h2>{totalBranches}</h2></th>
           <th>Average Marks <br/> <br/><h2>{avgMarks}</h2></th>
          
        

       

      
      
    </>
  );
}

export default Dashboard;
