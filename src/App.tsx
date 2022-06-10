import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Dashboard from "./pages/admin/dashboard/dashboard";
import LectureDashboard from './pages/Lecturer/Dashboard/dashboard';
import StudentDashboard from './pages/student/dashboard/dashboard';
import AdminCourses from './pages/admin/courses/courses';
import AdminModules from './pages/admin/modules/modules';
import AdminUsers from './pages/admin/users/users';
import LectureClasses from './pages/Lecturer/classes/classes';
import StudentCourses from "./pages/student/courses/courses";
import AdminAnalytics from "./pages/admin/analytics/analytics";
import AdminReporting from "./pages/admin/reporting/reporting";
import LectureFiles from "./pages/Lecturer/files/files";
import LectureReporting from "./pages/Lecturer/reporting/reporting";
import LectureAnalytics from "./pages/Lecturer/analytics/analytics";
import LectureAttendance from "./pages/Lecturer/Attendance/attendance";
import LectureAssessments from "./pages/Lecturer/Assessments/assessments";

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
        <Route path="/lecturer/dashboard" element={<LectureDashboard />} />
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
      <Routes>
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
      <Routes>
        <Route path="/lecture/classes" element={<LectureClasses />} />
      </Routes>
      <Routes>
        <Route path="/student/courses" element={<StudentCourses />} />
      </Routes>
      <Routes>
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Routes>
      <Routes>
        <Route path="/admin/reporting" element={<AdminReporting />} />
      </Routes>
      <Routes>
        <Route path="/lecture/files" element={<LectureFiles />} />
      </Routes>
      <Routes>
        <Route path="/lecture/reporting" element={<LectureReporting />} />
      </Routes>
      <Routes>
        <Route path="/lecture/analytics" element={<LectureAnalytics />} />
      </Routes>
      <Routes>
        <Route path="/lecture/attendance" element={<LectureAttendance />} />
      </Routes>
      <Routes>
        <Route path="/lecture/assessments" element={<LectureAssessments />} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
