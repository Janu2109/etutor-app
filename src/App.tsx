import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Dashboard from "./pages/admin/dashboard/dashboard";
import LectureDashboard from './pages/Lecturer/Dashboard/dashboard';
import StudentDashboard from './pages/student/dashboard/dashboard';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/lecturer" element={<LectureDashboard />} />
      </Routes>
      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
