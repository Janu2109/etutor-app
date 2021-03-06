import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./dashboard.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { user } from "../../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { module } from "../../../types/module";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { course } from "../../../types/course";
import { lecture } from "../../../types/lecture";

function Dashboard() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [lecturers, setLecturers] = useState<lecture[]>([]);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

  const [users, setUsers] = useState<user[]>([]);

  const navigate = useNavigate();

  const course = useCallback(() => {
    axios
      .get(`api/course/select`)
      .then((res) => {
        console.log("Response", res.data);
        setCourses(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const lecturer = useCallback(() => {
    axios
      .get(`api/user/lecturers`)
      .then((res) => {
        setLecturers(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getStudent = useCallback(() => {
    axios
      .get(`api/user/all`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    course();
    lecturer();
    getStudent();
  }, []);

  function StudentCount(){
    var total: any[] = users.filter((x: user) => x.isStudent === true);
    return total.length;
  }

  function Redirect(url: string) {
    navigate(url);
  }

  return (
    <div
      className={
        isDarkMode
          ? "lecture-dash-container dark-mode"
          : "lecture-dash-container"
      }
    >
      <nav id="lectureNav" className={sideNavToggle ? "" : "nav-closed"}>
        <div className="logo-name">
          <div className="logo-image">
            <img src={logo} alt="logo" />
          </div>
          <span className="logo_name">Turbo.Js</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li onClick={() => Redirect("/student")}>
              <a href="#">
                <i className="uil uil-estate" />
                <span className="link-name">Dashboard</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/reporting")}>
              <a href="#">
                <i className="uil uil-file-download-alt" />
                <span className="link-name">Reporting</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/courses")}>
              <a href="#">
                <i className="uil uil-book-open" />
                <span className="link-name">Courses</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/assessments")}>
              <a href="#">
                <i className="uil uil-trademark" />
                <span className="link-name">Assessments</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/classes")}>
              <a href="#">
                <i className="uil uil-hourglass" />
                <span className="link-name">Classes</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/studyMaterial")}>
              <a href="#">
                <i className="uil uil-clipboard-blank" />
                <span className="link-name">Study Material</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/communication")}>
              <a href="#">
                <i className="uil uil-comments-alt" />
                <span className="link-name">Communication</span>
              </a>
            </li>
          </ul>
          <ul className="logout-mod">
            <li onClick={() => Redirect("/")}>
              <a href="#">
                <i className="uil uil-signout" />
                <span className="link-name">Log Out</span>
              </a>
            </li>

            <li className="mode">
              <a href="#">
                <i className="uil uil-wind-moon" />
                <span className="link-name">Dark Mode</span>
              </a>
              <div
                className="mode-toggle"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <span className="switch"></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <section className="dashboard">
        <div className="top">
          <i
            className="uil uil-list-ul sidebar-toggle"
            onClick={() => setSideNavToggle(!sideNavToggle)}
          />
          <img src={Icon} alt="" />
        </div>
        <div className="dash-content">
          <div className="overview">
            <div className="title">
              <i className="uil uil-tachometer-fast" />
              <span className="text">Dashboard - Student</span>
            </div>
            <div className="boxes">
              <div className="box box1">
                <i className="uil uil-book" />
                <span className="text">Total Courses</span>
                <span className="number">{courses.length}</span>
              </div>
              <div className="box box2">
                <i className="uil uil-user-md" />
                <span className="text">Total Lecturers</span>
                <span className="number">{lecturers.length}</span>
              </div>
              <div className="box box3">
                <i className="uil uil-book-open" />
                <span className="text">Students Enrolled</span>
                <span className="number">{StudentCount()}</span>
              </div>
            </div>
          </div>
          <div className="activity">
            <div className="title">
              <i className="uil uil-play" />
              <span className="text">Online Learning Intro</span>
            </div>
            <div className="activity-data">
              {/* Video player here */}
              <ReactPlayer url={'https://www.youtube.com/watch?v=1SZle1skb84'} width={'5000px'} height={'600px'} controls={true}/>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
