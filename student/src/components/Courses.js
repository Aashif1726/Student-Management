import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import { Tooltip } from "@mui/material";
import "./Stats.css"

function Courses() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/branch-stats", { withCredentials: true })
      .then((res) => {
        const students = res.data;

        const branchMap = {};

        students.forEach((s) => {
          if (!branchMap[s.branch]) {
            branchMap[s.branch] = { branch: s.branch, male: 0, female: 0, total: 0 };
          }

          if (s.gender === "Male") branchMap[s.branch].male += 1;
          else if (s.gender === "Female") branchMap[s.branch].female += 1;

          branchMap[s.branch].total += 1;
        });

        setStats(Object.values(branchMap));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
       <Tooltip title="This page shows Course details">
        <InfoOutlineRoundedIcon />
      </Tooltip>
      <span style={{ padding: "4px" }}>
        <b>Courses Page</b>
      </span>
      <br /> <br />
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Male</th>
            <th>Female</th>
            <th>Total Students</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((b, index) => (
            <tr key={index}>
              <td>{b.branch}</td>
              <td>{b.male}</td>
              <td>{b.female}</td>
              <td>{b.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Courses;
