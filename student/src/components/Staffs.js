import React, { useEffect, useState } from "react";
import {
  Tooltip,
  Skeleton,
  Pagination,
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
import "./Staffs.css";
import "./CreateStaff.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Staffs() {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  

  const [values, setValues] = useState({
    name: "",
    email: "",
    degree: "",
    age: "",
    role: "",
    place: "",
    gender: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:8080/staffs", { withCredentials: true })
      .then((res) => {
        setStaffs(res.data.response);
        setFilteredStaffs(res.data.response);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch staffs");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = staffs;

    if (searchQuery) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGender) {
      filtered = filtered.filter((s) => s.gender === selectedGender);
    }

    if (selectedRole) {
      filtered = filtered.filter((s) => s.role === selectedRole);
    }

    setFilteredStaffs(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedGender, selectedRole, staffs]);


  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStaffs = filteredStaffs.slice(indexOfFirst, indexOfLast);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.gender) {
      toast.warn("Please select gender");
      return;
    }

    try {
      const payload = {
        name: values.name,
        email: values.email,
        degree: values.degree,
        age: values.age,
        role: values.role,
        place: values.place,
        gender: values.gender,
        
      };
      console.log(payload)

      const res = await axios.post(
        "http://localhost:8080/staffs",
        payload,
        { withCredentials: true }
      );

      setStaffs((prev) => [...prev, res.data.response]);
      toast.success("Staff Created Successfully");

      setOpen(false);
      setValues({
        name: "",
        email: "",
        degree: "",
        age: "",
        role: "",
        place: "",
        gender: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Failed to create staff");
    }
  };

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
        onClick={() => setOpen(true)}
      >
        Create
      </button>

      <br /><br />

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", width: "200px" }}
        />

        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">Select Role</option>
          <option value="Professor">Professor</option>
          <option value="Assistant">Assistant</option>
          <option value="HOD">HOD</option>
        </select>
      </div>

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
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j}>
                      <Skeleton width={80} />
                    </td>
                  ))}
                </tr>
              ))
            : currentStaffs.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.degree}</td>
                  <td>{s.age}</td>
                  <td>{s.role}</td>
                  <td>{s.place}</td>
                  <td>{s.gender}</td>
                </tr>
              ))}
        </tbody>
      </table>

      <Pagination
        count={Math.ceil(filteredStaffs.length / itemsPerPage)}
        page={currentPage}
        onChange={(e, v) => setCurrentPage(v)}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

      <BootstrapDialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <SchoolIcon sx={{ color: "#4040a1" }} /> CREATE STAFF
        </DialogTitle>

        <DialogContent dividers>
          <form id="create-staff" onSubmit={handleSubmit}>
            <label>Staff Name :</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />

            <label>Staff Email :</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />

            <label>Degree :</label>
            <input
              type="text"
              name="degree"
              value={values.degree}
              onChange={handleChange}
              required
            />

            <label>Age :</label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              required
            />

            <label>Role :</label>
            <input
              type="text"
              name="role"
              value={values.role}
              onChange={handleChange}
              required
            />

            <label>Place :</label>
            <input
              type="text"
              name="place"
              value={values.place}
              onChange={handleChange}
              required
            />

            <label>Gender :</label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              required
              style={{ width: "300px", padding: "10px" }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button type="submit" form="create-staff">
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <ToastContainer transition={Bounce} autoClose={4000} />
    </>
  );
}

export default Staffs;
