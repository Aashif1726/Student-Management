import React, { useEffect, useState } from "react";
import { Tooltip, Skeleton } from "@mui/material";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import axios from "axios";
import "./Students.css";
import { useAuth } from "./utils/Auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SchoolIcon from "@mui/icons-material/School";
import "./CreateStudent.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    branch: "",
    place: "",
    marks: "",
    gender: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setValues({
      name: "",
      email: "",
      branch: "",
      place: "",
      marks: "",
      gender: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        ...values,
        marks: Number(values.marks),
      };

      if (!payload.gender) {
        alert("Please select a gender");
        return;
      }

      const res = await axios.post("http://localhost:8080/stud", payload, {
        withCredentials: true,
      });

      setStudents((prev) => [...prev, res.data.response]);

      setValues({
        name: "",
        email: "",
        branch: "",
        place: "",
        marks: "",
        gender: "",
      });
      setOpen(false);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to create student: " + (err.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/stud", { withCredentials: true })
      .then((res) => {
        setStudents(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Tooltip title="This page shows Students details">
        <InfoOutlineRoundedIcon />
      </Tooltip>
      <span style={{ padding: "4px" }}>
        <b>Students Page</b>
      </span>

      <button
        style={{
          width: "100px",
          float: "right",
          backgroundColor: "#4040a1",
          color: "white",
        }}
        onClick={handleClickOpen}
      >
        Create
      </button>

      <div style={{ width: "100%" }}>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Place</th>
              <th>Marks</th>
              <th>Gender</th>
            </tr>

            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton variant="text" width={30} />
                    </td>
                    <td>
                      <Skeleton variant="text" width={100} />
                    </td>
                    <td>
                      <Skeleton variant="text" width={150} />
                    </td>
                    <td>
                      <Skeleton variant="text" width={80} />
                    </td>
                    <td>
                      <Skeleton variant="text" width={80} />
                    </td>
                    <td>
                      <Skeleton variant="text" width={50} />
                    </td>
                    <td>
                      <Skeleton variant="text" width={50} />
                    </td>
                  </tr>
                ))
              : students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.branch}</td>
                    <td>{student.place}</td>
                    <td>{student.marks}</td>
                    <td>{student.gender}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
          <SchoolIcon sx={{ color: "#4040a1" }} /> CREATE STUDENT
        </DialogTitle>

        <DialogContent dividers sx={{ width: "500px" }}>
          <form id="create-student" onSubmit={handleSubmit}>
            <label>Student Name :</label>
            <input
              type="text"
              placeholder="Enter Student Name"
              name="name"
              onChange={handleChange}
              value={values.name}
              required
            />

            <label>Student Email:</label>
            <input
              type="email"
              placeholder="Enter Student Email"
              name="email"
              onChange={handleChange}
              value={values.email}
              required
            />

            <label>Student Branch :</label>
            <input
              type="text"
              placeholder="Enter Student Branch"
              name="branch"
              onChange={handleChange}
              value={values.branch}
              required
            />

            <label>Student Place:</label>
            <input
              type="text"
              placeholder="Enter Student Place"
              name="place"
              onChange={handleChange}
              value={values.place}
              required
            />

            <label>Student Marks :</label>
            <input
              type="number"
              placeholder="Enter Student Marks"
              name="marks"
              onChange={handleChange}
              value={values.marks}
              required
            />

            <label>Student Gender :</label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              required
              style={{width:"300px",padding:"10px"}}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ width: "150px", color: "white", backgroundColor: "#4040a1" }}
          >
            Close
          </Button>
          <Button
            type="submit"
            form="create-student"
            sx={{ width: "150px", color: "white", backgroundColor: "#4040a1" }}
          >
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default Students;
