import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from './components/AppLayout';
import Dashboard from './components/Dashboard';
import Staffs from './components/Staffs';
import Attendance from './components/Attendance';
import Courses from './components/Courses';
import Login from './components/Login';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthProvider } from './components/utils/Auth';



const LazyStudent = React.lazy(() => import("./components/Students"));

function App() {

  return (
    <AuthProvider>
      <Routes>
      
        <Route path="/login" element={<Login />} />

        
        <Route path="/" element={      
<AppLayout /> 

        }>
          <Route index element={<Dashboard />} />
          <Route path="stud" element={
            <React.Suspense fallback={
              <div style={{textAlign:"center"}}>
                <CircularProgress />
                <p>Loading students...</p>
              </div>
            }>
              <LazyStudent />
            </React.Suspense>
          }/>
          <Route path="staffs" element={<Staffs />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="courses" element={<Courses />} />   
        </Route>

        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
