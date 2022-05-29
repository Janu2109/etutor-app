import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./courses.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { user } from "../../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { course } from "../../../types/course";
import { lecture } from "../../../types/lecture";

function StudentCourses() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

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

  useEffect(() => {
    course();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function Enroll(courseId: number){
        axios
          .post(`api/enrollment/register?userId=${userId}&courseId=${courseId}`)
          .then((res) => {
            toast.success('You are now enrolled!');
          })
          .catch(() => toast.error("Something went wrong"));
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
          <li onClick={() => Redirect("/student/profile")}>
              <a href="#">
                <i className="uil uil-user-circle" />
                <span className="link-name">Profile</span>
              </a>
            </li>
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
              <span className="text">Course Enrollment</span>
            </div>
            <div className="boxes">
            <table className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((x: course) => {
                    return (
                      <tr>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td>{x.duration}</td>
                        <td>
                         
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => Enroll(x.id)}
                          >
                            Enroll
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="activity">
            <div className="title">
              <i className="uil uil-play" />
              <span className="text">Why Enrol?</span>
            </div>
            <div className="activity-data">
              {/* Video player here */}
              <ReactPlayer url={'https://www.youtube.com/watch?v=HndV87XpkWg'} width={'5000px'} height={'600px'} controls={true}/>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default StudentCourses;
