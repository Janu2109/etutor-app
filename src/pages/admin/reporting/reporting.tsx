import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./reporting.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { course } from "../../../types/course";
import { module } from "../../../types/module";
import ReactECharts from "echarts-for-react";
import { title } from "process";
import { user } from "../../../types/user";
import ReactPlayer from "react-player";
import { classes } from "../../../types/classes";
import { adminClasses } from "../../../types/adminClasses";
import { adminModules } from "../../../types/adminModules";
import { studentsEnrolled } from "../../../types/studentsEnrolled";
import { isJSDocTypedefTag } from "typescript";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setDarkMode } from "../../../redux/slice/darkSlice";
import { loginHistory } from "../../../types/loginHistory";
import "jspdf-autotable";

function AdminReporting() {
  const darkMode: boolean = useSelector((state: RootState) => state.dark.value);

  const dispatch = useDispatch();

  const [view, setView] = useState("");

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

  const [modules, setModules] = useState<adminModules[]>([]);

  const [classes, setClasses] = useState<adminClasses[]>([]);

  const [studentsEnrolled, setStudentsEnrolled] = useState<studentsEnrolled[]>(
    []
  );

  const [users, setUsers] = useState<user[]>([]);

  const [logHistory, setLogHistory] = useState<loginHistory[]>([]);

  var students = users.filter((x: user) => x.isStudent === true);

  var lecturers = users.filter((x: user) => x.isLecturer === true);

  var admins = users.filter((x: user) => x.isAdministrator === true);

  var date: any = new Date();
  date = date.toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const getCourses = useCallback(() => {
    axios
      .get(`api/course/select`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getUsers = useCallback(() => {
    axios
      .get(`api/user/all`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getModules = useCallback(() => {
    axios
      .get(`api/adminmodules/select`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getClasses = useCallback(() => {
    axios
      .get(`api/adminclasses/select`)
      .then((res) => {
        setClasses(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getStudentsEnrolled = useCallback(() => {
    axios
      .get(`api/studentsEnrolled/select`)
      .then((res) => {
        setStudentsEnrolled(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getLoginHistory = useCallback(() => {
    axios
      .get(`api/loginhistory/select`)
      .then((res) => {
        setLogHistory(res.data);
      })
      .catch(() => toast.error("Error loading login history"));
  }, []);

  useEffect(() => {
    getCourses();
    getModules();
    getUsers();
    getClasses();
    getStudentsEnrolled();
    getLoginHistory();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function ReturnRole(x: user) {
    if (x.isStudent === true) {
      return "Student";
    } else if (x.isLecturer === true) {
      return "Lecturer";
    } else return "Admin";
  }

  function SaveModules() {
    // const input: HTMLElement = document.getElementById("moduleTbl")!;
    // html2canvas(input).then((canvas: any) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, "PNG", 5, 15, 200, 25);
    //   pdf.save("ModulesReport.pdf");
    // });
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Modules - ${date}`;
    const headers = [['Name', 'Description', 'Course', 'Lecture']];

    const data = modules.map((elt: adminModules) => [elt.name, elt.description, elt.course, `${elt.lectureFirstName}_${elt.lectureLastName}`]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    (doc as any).autoTable(content);
    doc.save(`Modules_${date}.pdf`)
  }

  function SaveCourses() {
    // const input: HTMLElement = document.getElementById("CoursesTbl")!;
    // html2canvas(input).then((canvas: any) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, "PNG", 5, 15, 200, 35);
    //   pdf.save("CoursesReport.pdf");
    // });
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Courses - ${date}`;
    const headers = [['Name', 'Description', 'Duration']];

    const data = courses.map((elt: course) => [elt.name, elt.description, elt.duration]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    (doc as any).autoTable(content);
    doc.save(`Courses_${date}.pdf`)
  }

  function SaveClasses() {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Classes - ${date}`;
    const headers = [['Module','Day', 'Start', 'End', 'Lecture']];

    const data = classes.map((elt: adminClasses) => [elt.module, elt.day, elt.timeStart, elt.timeEnd, `${elt.lectureFirstName}_${elt.lectureLastName}`]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    (doc as any).autoTable(content);
    doc.save(`Classes_${date}.pdf`)
  }

 

  function SaveUsers() {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Users Active - ${date}`;
    const headers = [['Role', 'First Name', 'Last Name', 'City']];

    const data = users.map((elt: user) => [ReturnRole(elt), elt.firstName, elt.lastName, elt.city]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    (doc as any).autoTable(content);
    doc.save(`UsersActive_${date}.pdf`)
  }

  function SaveStudentsEnrolled() {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Students Enrolled - ${date}`;
    const headers = [['First Name', 'Last Name', 'Email', 'Course']];

    const data = studentsEnrolled.map((elt: studentsEnrolled) => [elt.firstName, elt.lastName, elt.email, elt.name]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    (doc as any).autoTable(content);
    doc.save(`StudentsEnrolled_${date}.pdf`)
  }

  function SaveLoginHistory(){
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Login History - ${date}`;
    const headers = [['IP Address', 'City', 'Date', 'User']];

    const data = logHistory.map((elt: loginHistory) => [elt.ip, elt.city, elt.date, elt.firstName + '_' +elt.lastName]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    (doc as any).autoTable(content);
    doc.save(`LoginHistory${date}.pdf`)
  }

  return (
    <div
      className={
        darkMode
          ? "admin-courses-container dark-mode"
          : "admin-courses-container"
      }
    >
      <nav id="adminNav" className={sideNavToggle ? "" : "nav-closed"}>
        <div className="logo-name">
          <div className="logo-image">
            <img src={logo} alt="logo" />
          </div>
          <span className="logo_name">Turbo.Js</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li onClick={() => Redirect("/admin/dashboard")}>
              <a href="#">
                <i className="uil uil-estate" />
                <span className="link-name">Dashboard</span>
              </a>
            </li>
            <li onClick={() => Redirect("/admin/reporting")}>
              <a href="#">
                <i className="uil uil-file-download-alt" />
                <span className="link-name">Reporting</span>
              </a>
            </li>
            <li onClick={() => Redirect("/admin/analytics")}>
              <a href="#">
                <i className="uil uil-chart-line" />
                <span className="link-name">Analytics</span>
              </a>
            </li>
            <li onClick={() => Redirect("/admin/courses")}>
              <a href="#">
                <i className="uil uil-edit" />
                <span className="link-name">Manage Courses</span>
              </a>
            </li>
            <li onClick={() => Redirect("/admin/modules")}>
              <a href="#">
                <i className="uil uil-book-open" />
                <span className="link-name">Manage Modules</span>
              </a>
            </li>
            <li onClick={() => Redirect("/admin/users")}>
              <a href="#">
                <i className="uil uil-user" />
                <span className="link-name">Manage Users</span>
              </a>
            </li>
            <li onClick={() => Redirect("/admin/communication")}>
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
                onClick={() => dispatch(setDarkMode(!darkMode))}
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
              <span className="text">Reporting</span>
            </div>
          </div>
          <hr />
          <label htmlFor="exampleFormControlSelect1">Report Type</label>
          <select
            onChange={(e) => setView(e.currentTarget.value)}
            className="form-control"
            id="exampleFormControlSelect1"
          >
            <option>-- Select --</option>
            <option value={"Modules"}>Modules</option>
            <option value={"Courses"}>Courses</option>
            <option value={"Classes"}>Classes</option>
            <option value={"Users"}>Users</option>
            <option value={"Enrolled"}>Students Enrolled</option>
            <option value={"LogHistory"}>System Login History</option>
          </select>
          <br />
          {view === "Modules" && (
            <>
              <button
                onClick={() => SaveModules()}
                type="button"
                className="btn btn-primary"
              >
                Generate PDF
              </button>
              <br />
              <br />
              <CSVLink
                data={modules}
                filename={`Modules_${date}`}
                className="btn btn-primary mb-3"
              >
                Export to Excel
              </CSVLink>
              <br />
              <table
                id="moduleTbl"
                className="table table-striped course-table"
              >
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Lecture</th>
                    <th scope="col">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((x: adminModules) => {
                    return (
                      <tr>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td>{x.lectureFirstName} {x.lectureLastName}</td>
                        <td>{x.course}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          {view === "Courses" && (
            <>
              <button
                onClick={() => SaveCourses()}
                type="button"
                className="btn btn-primary"
              >
                Generate PDF
              </button>
              <br />
              <br />
              <CSVLink
                data={courses}
                filename={`Courses_${date}`}
                className="btn btn-primary mb-3"
              >
                Export to Excel
              </CSVLink>
              <br />
              <table
                id="CoursesTbl"
                className="table table-striped course-table"
              >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((x: course) => {
                    return (
                      <tr>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td>{x.duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          {view === "LogHistory" && (
            <>
              <button onClick={() => SaveLoginHistory()} type="button" className="btn btn-primary">
                Generate PDF
              </button>
              <br />
              <br />
              <CSVLink
                data={logHistory}
                filename={`LoginHistory_${date}`}
                className="btn btn-primary mb-3"
              >
                Export to Excel
              </CSVLink>
              <br />
              <table
                id="CoursesTbl"
                className="table table-striped course-table"
              >
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">City</th>
                    <th scope="col">Date</th>
                    <th scope="col">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logHistory.map((x: loginHistory) => {
                    return (
                      <tr>
                        <td>
                          {x.firstName} {x.lastName}
                        </td>
                        <td>{x.city}</td>
                        <td>
                          {x.date}
                        </td>
                        <td>{x.ip}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          {view === "Classes" && (
            <>
              <button
                onClick={() => SaveClasses()}
                type="button"
                className="btn btn-primary"
              >
                Generate PDF
              </button>
              <br />
              <br />
              <CSVLink
                data={classes}
                filename={`Classes_${date}`}
                className="btn btn-primary mb-3"
              >
                Export to Excel
              </CSVLink>
              <br />
              <table
                id="classesTbl"
                className="table table-striped course-table"
              >
                <thead>
                  <tr>
                    <th scope="col">Module</th>
                    <th scope="col">Day</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Lecture</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((x: adminClasses) => {
                    return (
                      <tr>
                        <td>{x.module}</td>
                        <td>{x.day}</td>
                        <td>{x.timeStart}</td>
                        <td>{x.timeEnd}</td>
                        <td>{x.lectureFirstName} {x.lectureLastName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          {view === "Users" && (
            <>
              <button
                onClick={() => SaveUsers()}
                type="button"
                className="btn btn-primary"
              >
                Generate PDF
              </button>
              <br />
              <br />
              <CSVLink
                data={users}
                filename={`UsersActive_${date}`}
                className="btn btn-primary mb-3"
              >
                Export to Excel
              </CSVLink>
              <br />
              <table id="usersTbl" className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">City</th>
                    <th scope="col">Role</th>
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
                        <td>{x.city}</td>

                        <td>{ReturnRole(x)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          {view === "Enrolled" && (
            <>
              <button
                onClick={() => SaveStudentsEnrolled()}
                type="button"
                className="btn btn-primary"
              >
                Generate PDF
              </button>
              <br />
              <br />
              <CSVLink
                data={studentsEnrolled}
                filename={`StudentsEnrolled_${date}`}
                className="btn btn-primary mb-3"
              >
                Export to Excel
              </CSVLink>
              <br />
              <table
                id="studEnrolledTbl"
                className="table table-striped course-table"
              >
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsEnrolled.map((x: studentsEnrolled) => {
                    return (
                      <tr>
                        <td>{x.firstName}</td>
                        <td>{x.lastName}</td>
                        <td>{x.email}</td>
                        <td>{x.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default AdminReporting;
