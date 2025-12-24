import React, { useEffect, useState } from "react";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import {
  Card,
  CardContent,
  Tooltip,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import SchoolIcon from "@mui/icons-material/School";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useAuth } from "./utils/Auth";


function Dashboard() {
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const auth = useAuth()

  useEffect(() => {
    axios
      .get("http://localhost:8080/stud", { withCredentials: true })
      .then((res) => setStudents(res.data.response))
      .catch((err) =>
        toast.error(err.message || "Failed to fetch students")
      );
  }, []);

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/staffs", { withCredentials: true })
      .then((res) => setStaffs(res.data.response))
      .catch((err) =>
        toast.error(err.message || "Failed to fetch staffs")
      );
  }, []);

  const totalStudents = students.length;
  const totalStaffs = staffs.length;

  const totalBranches = new Set(students.map((s) => s.branch)).size;

  const totalMarks = students.reduce(
    (sum, s) => sum + (s.marks || 0),
    0
  );

  const avgMarks =
    students.length > 0
      ? (totalMarks / students.length).toFixed(2)
      : "0.00";


  const branchMap = {};
  students.forEach((s) => {
    branchMap[s.branch] = (branchMap[s.branch] || 0) + 1;
  });

  const studentsVsPlace = {
    xAxis: [
      {
        scaleType: "band",
        data: Object.keys(branchMap),
        
      },
    ],
    series: [
      {
        data: Object.values(branchMap),
        label: "Students",
        color: "#1976d2",
      },
    ],
  };


  const roleMap = {};
  staffs.forEach((s) => {
    roleMap[s.role] = (roleMap[s.role] || 0) + 1;
  });

  const staffsVsRole = Object.keys(roleMap).map((role, index) => ({
    id: index,
    label: role,
    value: roleMap[role],
  }));

  const genderMap = {};
  staffs.forEach((s) => {
    genderMap[s.gender] = (genderMap[s.gender] || 0) + 1;
  });

  const staffsVsGender = Object.keys(genderMap).map((gender, index) => ({
    id: index,
    label: gender,
    value: genderMap[gender],
  }));

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Tooltip title="This page shows dashboard details">
        <InfoOutlineRoundedIcon />
      </Tooltip>

      <span style={{ padding: "4px" }}>
        <b>Dashboard Page</b>
      </span>
      <br/><br/>
          <b style={{color:"#4040a1",textTransform:"capitalize"}}>Welcome {user.username} !!</b>

      <br /><br />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 3,
        }}
      >
        <Card sx={{ backgroundColor: "transparent", boxShadow: "2px 2px 2px 2px #4040a1" }}>
          <CardContent>
            <Typography color="primary">
              <SchoolIcon /> &nbsp;Total Students
            </Typography>
            <Typography variant="h4" color="primary">
              {totalStudents}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "transparent", boxShadow: "2px 2px 2px 2px purple" }}>
          <CardContent>
            <Typography color="secondary">
              <PeopleAltIcon /> &nbsp;Total Staffs
            </Typography>
            <Typography variant="h4" color="secondary">
              {totalStaffs}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "transparent", boxShadow: "2px 2px 2px 2px green" }}>
          <CardContent>
            <Typography color="success.main">
              <ApartmentIcon /> &nbsp;Total Branches
            </Typography>
            <Typography variant="h4" color="success.main">
              {totalBranches}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "transparent", boxShadow: "2px 2px 2px 2px orange" }}>
          <CardContent>
            <Typography color="warning.main">
              <AssessmentIcon /> &nbsp;Average Marks
            </Typography>
            <Typography variant="h4" color="warning.main">
              {avgMarks}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <br /><br />
      <Paper elevation={5} sx={{backgroundColor:"transparent",boxShadow:"2px 2px 2px 2px #4040a1"}}>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 4,
        }}
      >
        <Box>
          <Typography align="center" variant="h6" color="primary">
            Students vs Place
          </Typography>
          <BarChart
            xAxis={studentsVsPlace.xAxis}
            series={studentsVsPlace.series}
            height={300}
            
          />
        </Box>

        <Box>
          <Typography align="center" variant="h6" color="primary">
            Staffs vs Role
          </Typography>
          <PieChart
            series={[
              {
                data: staffsVsRole,
                innerRadius: 40,
                outerRadius: 100,
              },
            ]}
            height={300}
          />
        </Box>

        <Box>
          <Typography align="center" variant="h6" color="primary">
            Staffs vs Gender
          </Typography>
          <PieChart
            series={[
              {
                data: staffsVsGender,
                innerRadius: 40,
                outerRadius: 100,
              },
            ]}
            height={300}
          />
        </Box>
      </Box>
      </Paper>
    </>
  );
}

export default Dashboard;
