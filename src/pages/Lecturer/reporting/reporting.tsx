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
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

function LectureReporting() {
    const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [view, setView] = useState('');

  console.log(view);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [modules, setModules] = useState<module[]>([]);

  const [classes, setClasses] = useState<classes[]>([])

  const getModules = useCallback(() => {
    axios
      .get(`api/module/lecture/modules?lectureId=${userId}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getClasses = useCallback(() => {
    axios
      .get(`api/classes/lecture?lectureId=${userId}`)
      .then((res) => {
        setClasses(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    getModules();
    getClasses();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

function SaveModules(){
  const input: HTMLElement = document.getElementById('moduleTbl')!;
  html2canvas(input)
  .then((canvas: any) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 5, 15, 200, 35);
    pdf.save("ModulesReport.pdf");  
  })
}

function SaveClasses(){
  const input: HTMLElement = document.getElementById('classesTbl')!;
  html2canvas(input)
  .then((canvas: any) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 5, 15, 200, 25);
    pdf.save("ClassesReport.pdf");  
  })
}

function ReturnModule(x: number) {
    var result: module[] = modules.filter((y: module) => y.id === x);
    return result[0].name;
  }

  return (
    <div
      className={
        isDarkMode
          ? "admin-courses-container dark-mode"
          : "admin-courses-container"
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
              <span className="text">Reporting</span>
            </div>
          </div>
          <hr />
          <label htmlFor="exampleFormControlSelect1">Report Type</label>
          <select onChange={(e) => setView(e.currentTarget.value)} className="form-control" id="exampleFormControlSelect1">
            <option>-- Select --</option>
            <option value={'Modules'}>Modules</option>
            <option value={'Classes'}>Classes</option>
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
                  </tr>
                </thead>
                <tbody>
                  {modules.map((x: module) => {
                    return (
                      <tr>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                       
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
                    <th scope="col">Module</th>
                    <th scope="col">Day</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((x: classes) => {
                    return (
                      <tr>
                        <td>{ReturnModule(x.moduleId)}</td>
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
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default LectureReporting;
