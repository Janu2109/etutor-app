import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Dashboard from "./pages/admin/dashboard/dashboard";
import LectureDashboard from './pages/Lecturer/Dashboard/dashboard';
import StudentDashboard from './pages/student/dashboard/dashboard';
import AdminCourses from './pages/admin/courses/courses';
import AdminModules from './pages/admin/modules/modules';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/lecturer" element={<LectureDashboard />} />
      </Routes>
      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
      <Routes>
        <Route path="/admin/courses" element={<AdminCourses />} />
      </Routes>
      <Routes>
        <Route path="/admin/modules" element={<AdminModules />} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
