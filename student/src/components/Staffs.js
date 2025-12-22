import React, { useEffect, useState } from "react";
import { Tooltip, Skeleton } from "@mui/material";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import axios from "axios";
import "./Staffs.css";
import { useAuth } from "./utils/Auth";
import { useNavigate } from "react-router-dom";

function Students() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/staffs", {
        withCredentials: true,
      })
      .then((res) => {
        setStaffs(res.data.response);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); 
      });
  }, []);

  return (
    <>
      <Tooltip title="This page shows Staffs details">
        <InfoOutlineRoundedIcon />
      </Tooltip>
      <span style={{ padding: "4px" }}>
        <b>Staffs Page</b>
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
              <th>Staff Name</th>
              <th>Email</th>
              <th>Degree</th>
              <th>Age</th>
              <th>Role</th>
              <th>Place</th>
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
              : staffs.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.id}</td>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.degree}</td>
                    <td>{staff.age}</td>
                    <td>{staff.role}</td>
                    <td>{staff.place}</td>
                    <td>{staff.gender}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Students;
