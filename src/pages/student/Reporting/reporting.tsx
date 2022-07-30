import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./reporting.scss";
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
import {studentMarks} from '../../../types/studentMarks';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

function StudentReporting() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

  const [myMarks, setMarks] = useState<studentMarks[]>([]);

  const navigate = useNavigate();

  const marks = useCallback(() => {
    axios
      .get(`api/marks/student/marks?studentId=${userId}`)
      .then((res) => {setMarks(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    marks();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function SaveMarks(){
    const input: HTMLElement = document.getElementById('marksTbl')!;
    html2canvas(input)
    .then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 5, 15, 200, 25);
      pdf.save("MarksReport.pdf");  
    })
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
              <span className="text">Student Marks Report</span>
            </div>
            <div className="boxes">
              <table className="table table-striped course-table" id="marksTbl">
                <thead>
                  <tr>
                    <th scope="col">Mark</th>
                    <th scope="col">Module Id</th>
                  </tr>
                </thead>
                <tbody>
                  {myMarks.map((x: studentMarks) => {
                    return (
                      <tr>
                        <td>{x.mark}</td>
                        <td>{x.moduleId}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <br />
              <button type="button" className="btn btn-primary" onClick={() => SaveMarks()}>
                Download Marks
              </button>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default StudentReporting;
