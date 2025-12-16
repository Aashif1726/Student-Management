import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Staffs from './components/Staffs';
import Attendance from './components/Attendance';
import Courses from './components/Courses';
import Profile from './components/Profile';
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route element={<AppLayout/>}>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/students' element={<Students/>} />
          <Route path='/staffs' element={<Staffs/>} />
          <Route path='/attendance' element={<Attendance/>} />
          <Route path='/courses' element={<Courses/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/logout' element={<Logout/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
