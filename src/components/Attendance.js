import React, { useEffect, useState } from "react";
import {
  Tooltip,
  Skeleton,
  Pagination,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Students.css"; // reuse same styles

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState("");
  const [branch, setBranch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 
  useEffect(() => {
    axios
      .get("http://localhost:8080/stud", { withCredentials: true })
      .then((res) => {
        setStudents(res.data.response);
        setFilteredStudents(res.data.response);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch students");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = students;
    if (branch) {
      filtered = filtered.filter((s) => s.branch === branch);
    }
    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [branch, students]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  const handleCheckbox = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSubmitAttendance = async () => {
    if (!date || !branch) {
      toast.warn("Please select date and branch");
      return;
    }

    const payload = filteredStudents.map((s) => ({
      studentId: s.id,
      branch: s.branch,
      date: date,
      status: attendance[s.id] ? "Present" : "Absent",
    }));

    try {
      await axios.post("http://localhost:8080/attendance/bulk", payload, {
        withCredentials: true,
      });
      toast.success("Attendance marked successfully");
      setOpen(false);
      setAttendance({});
    } catch {
      toast.error("Failed to save attendance");
    }
  };

  return (
    <>
      <Tooltip title="Daily Attendance Page">
        <InfoOutlineRoundedIcon />
      </Tooltip>
      <span style={{ padding: "4px" }}>
        <b>Attendance Page</b>
      </span>

      <button
        style={{
          width: "160px",
          float: "right",
          backgroundColor: "#4040a1",
          color: "white",
        }}
        onClick={() => setOpen(true)}
      >
        Mark Attendance
      </button>

      <br /><br />

      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">Select Branch</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Economics">Economics</option>
          <option value="Maths">Maths</option>
          <option value="Physics">Physics</option>
          <option value="Data Science">Data Science</option>
        </select>
      </div>

      {/* Table */}
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Attendance</th>
          </tr>

          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td><Skeleton width={30} /></td>
                  <td><Skeleton width={120} /></td>
                  <td><Skeleton width={100} /></td>
                  <td><Skeleton width={50} /></td>
                </tr>
              ))
            : currentStudents.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.branch}</td>
                  <td>
                    <Checkbox
                      checked={attendance[s.id] || false}
                      onChange={() => handleCheckbox(s.id)}
                      color="success"
                    />
                    {attendance[s.id] ? "Present" : "Absent"}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <Pagination
        count={Math.ceil(filteredStudents.length / itemsPerPage)}
        page={currentPage}
        onChange={(e, v) => setCurrentPage(v)}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

      {/* Dialog */}
      <BootstrapDialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <SchoolIcon sx={{ color: "#4040a1" }} /> CONFIRM ATTENDANCE
        </DialogTitle>

        <DialogContent dividers>
          <p><b>Date:</b> {date}</p>
          <p><b>Branch:</b> {branch}</p>
          <p>Total Students: {filteredStudents.length}</p>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitAttendance} variant="contained">
            Save Attendance
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <ToastContainer transition={Bounce} autoClose={4000} />
    </>
  );
}

export default Attendance;
