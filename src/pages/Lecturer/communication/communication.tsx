import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./communication.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { module } from "../../../types/module";
import { user } from "../../../types/user";
import { classes } from "../../../types/classes";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import {message} from '../../../types/message';

function LectureCommunication() {
    const userId: any = useSelector((state: RootState) => state.user.value);

  const [view, setView] = useState('');

  const [messages, setMessages] = useState<message[]>([]);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState(0);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);



  const [modules, setModules] = useState<module[]>([]);

  const [message, setMessage] = useState<string>('');

  const getModules = useCallback(() => {
    axios
      .get(`api/module/lecture/modules?lectureId=${userId}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    getModules();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  useEffect(() => {
    GetMessages();
  },[selectedModule])

  
  function GetMessages(){
    axios
      .get(`api/message/select?moduleId=${selectedModule}`)
      .then((res) => {
        setMessages(res.data);
      })
  }

  function SendMessage(){
    axios
      .post(`api/message/new?message=${message}&moduleId=${selectedModule}&userId=${userId}`)
      .then((res) => {
        toast.success('Message Sent');
        GetMessages();
      })
      .catch(() => toast.error("Error sending message"));
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
              <span className="text">Communication</span>
            </div>
          </div>
          <hr />
        </div>
        <label htmlFor="exampleFormControlSelect1">Module</label>
          <select onChange={(e) => setSelectedModule(parseInt(e.currentTarget.value))} className="form-control" id="exampleFormControlSelect1">
            <option>-- Select Module --</option>
            {modules.map((x: module) => {
                return (
                    <option value={x.id}>{x.name}</option>
                )
            })}
          </select>
          <br />
          <input onChange={(e) => setMessage(e.currentTarget.value)} className="form-control" type="text" placeholder="Type Message here"/>
          <br />
          <button onClick={() => SendMessage()} type="button" className="btn btn-primary">Send Message</button>
          <br />
          <br />
          {messages.length > 0 ? (<>
          <div className="com-container">
          {messages.map((x: message) => {
            return (
              <div className={x.userId === userId ? 'com-message-self' : 'com-message-other'}>
                <b>{x.firstName} {x.lastName}</b>
                <hr/>
                <p>{x.message}</p>
              </div>
            )
          
          })}
          </div>
          </>):(<></>)}
      </section>
      <ToastContainer />
    </div>
  );
}

export default LectureCommunication;
