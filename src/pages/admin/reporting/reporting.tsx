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
import { studentsEnrolled } from "../../../types/studentsEnrolled";
import { isJSDocTypedefTag } from "typescript";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

function AdminReporting() {
    

  const [view, setView] = useState('');

  console.log(view);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

  const [modules, setModules] = useState<module[]>([]);

  const [classes, setClasses] = useState<classes[]>([])

  const [studentsEnrolled, setStudentsEnrolled] = useState<studentsEnrolled[]>([]);

  const [users, setUsers] = useState<user[]>([]);

  var students = users.filter((x: user) => x.isStudent === true);

  var lecturers = users.filter((x: user) => x.isLecturer === true);

  var admins = users.filter((x: user) => x.isAdministrator === true);

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
      .get(`api/module/select`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getClasses = useCallback(() => {
    axios
      .get(`api/classes/all`)
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

  useEffect(() => {
    getCourses();
    getModules();
    getUsers();
    getClasses();
    getStudentsEnrolled();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function ReturnRole(x: user){
    if(x.isStudent === true){
        return 'Student';
    }else if(x.isLecturer === true){
        return 'Lecturer';
    }else return 'Admin';
}

function SaveModules(){
  const input: HTMLElement = document.getElementById('moduleTbl')!;
  html2canvas(input)
  .then((canvas: any) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 5, 15, 200, 25);
    pdf.save("ModulesReport.pdf");  
  })
}

function SaveCourses(){
  const input: HTMLElement = document.getElementById('CoursesTbl')!;
  html2canvas(input)
  .then((canvas: any) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 5, 15, 200, 35);
    pdf.save("CoursesReport.pdf");  
  })
}

function SaveClasses(){
  const input: HTMLElement = document.getElementById('classesTbl')!;
  html2canvas(input)
  .then((canvas: any) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 5, 15, 200, 35);
    pdf.save("ClassesReport.pdf");  
  })
}

function SaveUsers(){
  const input: HTMLElement = document.getElementById('usersTbl')!;
  html2canvas(input)
  .then((canvas: any) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 5, 15, 200, 45);
    pdf.save("UsersReport.pdf");
  })
}

function SaveStudentsEnrolled(){
  const input: HTMLElement = document.getElementById('studEnrolledTbl')!;
  html2canvas(input)
  .then((canvas: any) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 5, 15, 200, 45);
    pdf.save("StudEnrolledReport.pdf");
  })
}

  return (
    <div
      className={
        isDarkMode
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
              <span className="text">Reporting</span>
            </div>
          </div>
          <hr />
          <label htmlFor="exampleFormControlSelect1">Report Type</label>
          <select onChange={(e) => setView(e.currentTarget.value)} className="form-control" id="exampleFormControlSelect1">
            <option>-- Select --</option>
            <option value={'Modules'}>Modules</option>
            <option value={'Courses'}>Courses</option>
            <option value={'Classes'}>Classes</option>
            <option value={'Users'}>Users</option>
            <option value={'Enrolled'}>Students Enrolled</option>
          </select>
          <br />
          {view === 'Modules' && 
          <>
          <button onClick={() => SaveModules()} type="button" className="btn btn-primary">Generate PDF</button>
          <br />
          <table id='moduleTbl' className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Lecture</th>
                    <th scope="col">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((x: module) => {
                    return (
                      <tr>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td>{x.lectureId}</td>
                        <td>{x.courseId}</td>
                       
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          }
          {view === 'Courses' && 
            <>
            <button onClick={() => SaveCourses()} type="button" className="btn btn-primary">Generate PDF</button>
            <br />
            <table id='CoursesTbl' className="table table-striped course-table">
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
          }
          {view === 'Classes' && 
           <>
           <button onClick={() => SaveClasses()} type="button" className="btn btn-primary">Generate PDF</button>
           <br />
           <table id='classesTbl' className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">LectureId</th>
                    <th scope="col">ModuleId</th>
                    <th scope="col">Day</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((x: classes) => {
                    return (
                      <tr>
                        <td>{x.id}</td>
                        <td>{x.lectureId}</td>
                        <td>{x.moduleId}</td>
                        <td>{x.day}</td>
                        <td>{x.timeStart}</td>
                        <td>{x.timeEnd}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             </>
          }
          {view === 'Users' && 
              <>
              <button onClick={() => SaveUsers()} type="button" className="btn btn-primary">Generate PDF</button>
              <br />
              <table id='usersTbl' className="table table-striped course-table">
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
          }
          {view === 'Enrolled' && 
             <>
             <button onClick={() => SaveStudentsEnrolled()} type="button" className="btn btn-primary">Generate PDF</button>
             <br />
             <table id='studEnrolledTbl' className="table table-striped course-table">
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
          }
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default AdminReporting;
