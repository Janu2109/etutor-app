import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./attendance.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { course } from "../../../types/course";
import { module } from "../../../types/module";
import { user } from "../../../types/user";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { addSyntheticLeadingComment } from "typescript";

function LectureAttendance() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [view, setView] = useState("");

  console.log(view);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [modules, setModules] = useState<module[]>([]);

  const [courses, setCourses] = useState<course[]>([]);

  const [courseId, setCoureId] = useState<number>(0);

  const [users, setUsers] = useState<user[]>([]);

  var date: Date = new Date()

  var stringDate = date.toDateString();

  var studentIds: any[] = [];

  const [selectedModule, setSelectedModule] = useState<number>(0);

  const getModules = useCallback(() => {
    axios
      .get(`api/module/lecture/modules?lectureId=${userId}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getCourses = useCallback(() => {
    axios
      .get(`api/course/select`)
      .then((res) => {
        console.log("Response", res.data);
        setCourses(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    getModules();
    getCourses();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function LoadStudents(){
    axios
    .get(`api/user/students/courseId?id=${courseId}`)
    .then((res) => {
      console.log("Response", res.data);
      setUsers(res.data);
    })
    .catch(() => toast.error("Error loading students"));
  }

  function Submit(){
      var passed: boolean = true;
    for(let key in studentIds){
        axios
      .post(`api/attendance/insert?moduleId=${selectedModule}&userId=${studentIds[key]}&date=${stringDate}`)
      .then((res) => {
        toast.success('Record added')
      })
      .catch(() => {
          passed = false;
      });
    }
    if(passed !== true){
        toast.error('Error');
    }
  }

  function AddStudent(e:any){
      studentIds.push(parseInt(e.currentTarget.value));
  }

  return (
    <div
      className={
        isDarkMode
          ? "lecture-attendance-container dark-mode"
          : "lecture-attendance-container"
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
            <li onClick={() => Redirect("/lecturer/dashboard")}>
              <a href="#">
                <i className="uil uil-estate" />
                <span className="link-name">Dashboard</span>
              </a>
            </li>
            <li onClick={() => Redirect("/lecture/reporting")}>
              <a href="#">
                <i className="uil uil-file-download-alt" />
                <span className="link-name">Reporting</span>
              </a>
            </li>
            <li onClick={() => Redirect("/lecture/analytics")}>
              <a href="#">
                <i className="uil uil-chart-line" />
                <span className="link-name">Analytics</span>
              </a>
            </li>
            <li onClick={() => Redirect("/lecture/assessments")}>
              <a href="#">
                <i className="uil uil-trademark" />
                <span className="link-name">Assessments</span>
              </a>
            </li>
            <li onClick={() => Redirect("/lecture/files")}>
              <a href="#">
                <i className="uil uil-upload" />
                <span className="link-name">Upload Files</span>
              </a>
            </li>
            <li onClick={() => Redirect("/lecture/classes")}>
              <a href="#">
                <i className="uil uil-hourglass" />
                <span className="link-name">Classes</span>
              </a>
            </li>
            <li onClick={() => Redirect("/lecture/attendance")}>
              <a href="#">
                <i className="uil uil-clipboard-blank" />
                <span className="link-name">Attendance</span>
              </a>
            </li>
            <li onClick={() => Redirect("/lecture/communication")}>
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
        <div className="dash-content-reporting">
          <div className="overview">
            <div className="title">
              <i className="uil uil-tachometer-fast" />
              <span className="text">Attendance</span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <select
                onChange={(e) => setCoureId(parseInt(e.currentTarget.value))}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option>-- Select Course --</option>
                {courses.map((x: course) => {
                  return <option value={x.id}>{x.name}</option>;
                })}
              </select>
            </div>
            <div className="col">
              <select
                onChange={(e) => setSelectedModule(parseInt(e.currentTarget.value))}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option>-- Select Module--</option>
                {modules.map((x: module) => {
                  return <option value={x.id}>{x.name}</option>;
                })}
              </select>
            </div>
            <div className="col">
            <button onClick={() => LoadStudents()} type="button" className="btn btn-primary">
            <i className="uil uil-eye" /> Load Students
          </button>
            </div>
            <div className="col">
            <button onClick={() => Submit()} type="button" className="btn btn-primary">
             Submit
          </button>
            </div>
          </div>
          <br />
          {users.length === 0 ? <i>Please select a course and a module to load data</i> : <table className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Not In Class</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((x: user) => {
                    return (
                      <tr>
                        <td>{x.id}</td>
                        <td>{x.firstName}</td>
                        <td>{x.lastName}</td>
                        <td>{x.email}</td>
                        <td>
                        <input className="form-check-input" type="checkbox" name="attending" value={x.id} id="defaultCheck1" onChange={(e) => AddStudent(e)}/>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default LectureAttendance;
