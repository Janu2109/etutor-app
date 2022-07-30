import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./studyMaterial.scss";
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
import {module} from '../../../types/module';
import {classes} from '../../../types/classes';
import { files } from "../../../types/files";

function StudentStudyMaterial() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [classes, setClasses] = useState<classes[]>([])

  const [files, setFiles] = useState<files[]>([])

  const [courses, setCourses] = useState<course[]>([]);
  const [modules, setModules] = useState<module[]>([]);

  const navigate = useNavigate();

  const myModules = useCallback(() => {
    axios
      .get(`api/module/student/modules?userId=${userId}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("You are not enrolled"));
  }, []);

  useEffect(() => {
    myModules();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function ModuleSelected(e: any) {
    axios
      .get(`api/files/module?moduleId=${e.currentTarget.value}`)
      .then((res) => {
        setFiles(res.data);
      })
      .catch(() => toast.error("Error"));
  }

  function DownloadFile(name: string){
    axios
    .get(`api/files/download?name=${name}`)
    .then((res) => {
      window.open(`https://localhost:7122/api/files/download?name=${name}`);
    })
    .catch(() => toast.error("Error"));
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
          {/* <li onClick={() => Redirect("/student/profile")}>
              <a href="#">
                <i className="uil uil-user-circle" />
                <span className="link-name">Profile</span>
              </a>
            </li> */}
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
            <select
                    onChange={(e) => ModuleSelected(e)}
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option>-- Select Module --</option>
                    {modules.map((x: module) => {
                      return <option value={x.id}>{x.name}</option>;
                    })}
                  </select>
                 <br/>
                 {files.length > 0 ? (
                    <>
                    <table className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">ModuleId</th>
                    <th scope="col">FileName</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((x: files) => {
                    return (
                      <tr>
                        <td>{x.moduleId}</td>
                        <td>{x.name}</td>
                        <td><button
                            type="button"
                            className="btn btn-success" onClick={() => DownloadFile(x.name)}
                          >
                            Download
                          </button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                    </>
                 ) : (<>
                    <i>No files to display</i>
                 </>)}
            
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default StudentStudyMaterial;
