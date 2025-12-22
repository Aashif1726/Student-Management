import React, { useEffect, useState } from "react";
import { Tooltip, Skeleton } from "@mui/material";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import axios from "axios";
import "./Students.css";
import { useAuth } from "./utils/Auth";
import { useNavigate } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/stud", {
        withCredentials: true,
      })
      .then((res) => {
        setStudents(res.data.response);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
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
    </>
  );
}

export default Students;
