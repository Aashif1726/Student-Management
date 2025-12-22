import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import axios from "axios";
import "./Students.css";
import { useAuth } from "./utils/Auth";

function Students() {
  const [students, setStudents] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:8080/stud", {
        withCredentials: true,
      })
      .then((res) => {
        setStudents(res.data.response);
      })
      .catch((err) => {
        console.log(err);
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

            {students.map((student) => (
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
    </>
  );
}

export default Students;
