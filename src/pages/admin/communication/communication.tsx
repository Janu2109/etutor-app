import { RootState } from "../../../redux/store";
import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./communication.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { course } from "../../../types/course";
import { module } from "../../../types/module";
import ReactECharts from 'echarts-for-react';
import { title } from "process";
import { user } from "../../../types/user";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import {message} from '../../../types/message';
import {setDarkMode} from '../../../redux/slice/darkSlice';


function AdminCommunication() {
  const darkMode: boolean = useSelector((state: RootState) => state.dark.value);

  const dispatch = useDispatch();

    const userId: any = useSelector((state: RootState) => state.user.value);
   
  const [selectedModule, setSelectedModule] = useState(0);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

  const [modules, setModules] = useState<module[]>([]);

  const [messages, setMessages] = useState<message[]>([]);

  const [users, setUsers] = useState<user[]>([]);

  const getUsers = useCallback(() => {
    axios
      .get(`api/user/all`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  var students = users.filter((x: user) => x.isStudent === true);

  var lecturers = users.filter((x: user) => x.isLecturer === true);

  var admins = users.filter((x: user) => x.isAdministrator === true);

  useEffect(() => {
    GetMessages();
  },[selectedModule])

  const getModules = useCallback(() => {
    axios
      .get(`api/module/select`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  function GetMessages(){
    axios
      .get(`api/message/select?moduleId=${selectedModule}`)
      .then((res) => {
        setMessages(res.data);
      })
  }

  useEffect(() => {
    getModules();
    getUsers();
  }, []);

  function Redirect(url: string) {
    navigate(url);
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
        <div className="dash-content-analytics">
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

export default AdminCommunication;

