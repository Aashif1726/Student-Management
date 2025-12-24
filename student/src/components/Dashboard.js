import React, { useEffect, useState } from "react";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import {
  Card,
  CardContent,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);

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

  return (
    <>
      <Tooltip title="This page shows dashboard details">
        <InfoOutlineRoundedIcon />
      </Tooltip>

      <span style={{ padding: "4px" }}>
        <b>Dashboard Page</b>
      </span>

      <br /><br />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 3,
        }}
      >
        <Card elevation={3}>
          <CardContent>
            <Typography variant="subtitle1">Total Students</Typography>
            <Typography variant="h4" color="primary">
              {totalStudents}
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={3}>
          <CardContent>
            <Typography variant="subtitle1">Total Staffs</Typography>
            <Typography variant="h4" color="secondary">
              {totalStaffs}
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={3}>
          <CardContent>
            <Typography variant="subtitle1">Total Branches</Typography>
            <Typography variant="h4" color="success.main">
              {totalBranches}
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={3}>
          <CardContent>
            <Typography variant="subtitle1">Average Marks</Typography>
            <Typography variant="h4" color="warning.main">
              {avgMarks}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Dashboard;
