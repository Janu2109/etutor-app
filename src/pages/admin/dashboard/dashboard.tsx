import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./dashboard.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { user } from "../../../types/user";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [allUsers, setAllUsers] = useState<user[]>([]);

  const users = useCallback(() => {
    axios
      .get(`api/user/all`)
      .then((res) => {
        console.log("Response", res.data);
        setAllUsers(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    users();
  }, []);

  function TotalStudents(){
    var filterData = allUsers.filter((user : user) => user.isStudent === true);
    return filterData.length;
  }

  function TotalLecturers(){
    var filterData = allUsers.filter((user : user) => user.isLecturer === true);
    return filterData.length;
  }

  function TotalAdmins(){
    var filterData = allUsers.filter((user : user) => user.isAdministrator === true);
    return filterData.length;
  }

  function GetDate(dateJoined : any){
    var date = moment(dateJoined).format(
      "YYYY-MM-DD"
    );
    return date;
  }

  function Redirect(url : string){
    navigate(url);
  }

  return (
    <div
      className={
        isDarkMode ? "admin-dash-container dark-mode" : "admin-dash-container"
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
            <li onClick={() => Redirect('/admin/dashboard')}>
              <a href="#">
                <i className="uil uil-estate" />
                <span className="link-name">Dashboard</span>
              </a>
            </li>
            <li onClick={() => Redirect('/admin/reporting')}>
              <a href="#">
                <i className="uil uil-file-download-alt" />
                <span className="link-name">Reporting</span>
              </a>
            </li>
            <li onClick={() => Redirect('/admin/analytics')}>
              <a href="#">
                <i className="uil uil-chart-line" />
                <span className="link-name">Analytics</span>
              </a>
            </li>
            <li onClick={() => Redirect('/admin/courses')}>
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
            <li onClick={() => Redirect('/admin/users')}>
              <a href="#">
                <i className="uil uil-user" />
                <span className="link-name">Manage Users</span>
              </a>
            </li>
            <li onClick={() => Redirect('/admin/communication')}>
              <a href="#">
                <i className="uil uil-comments-alt" />
                <span className="link-name">Communication</span>
              </a>
            </li>
          </ul>
          <ul className="logout-mod">
            <li onClick={() => Redirect('/')}>
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
              <span className="text">Dashboard - Admin</span>
            </div>
            <div className="boxes">
              <div className="box box1">
                <i className="uil uil-user" />
                <span className="text">Admins</span>
                <span className="number">{TotalAdmins()}</span>
              </div>
              <div className="box box2">
                <i className="uil uil-book-reader" />
                <span className="text">Students</span>
                <span className="number">{TotalStudents()}</span>
              </div>
              <div className="box box3">
                <i className="uil uil-user-md" />
                <span className="text">Lecturers</span>
                <span className="number">{TotalLecturers()}</span>
              </div>
            </div>
          </div>
          <div className="activity">
            <div className="title">
              <i className="uil uil-stopwatch" />
              <span className="text">Users</span>
            </div>
            <div className="activity-data">
            <div className="data status">
            <span className="data-title"># Id</span>
              {allUsers.map((x: user) => {
                  return <span className="data-list">{x.idNo}</span>
                })}
              </div>
              <div className="data names">
                <span className="data-title">Name</span>
                {allUsers.map((x: user) => {
                  return <span className="data-list">{x.firstName} {x.lastName}</span>
                })}
              </div>
              <div className="data email">
                <span className="data-title">Email</span>
                {allUsers.map((x: user) => {
                  return <span className="data-list">{x.email}</span>
                })}
              </div>
              <div className="data joined">
                <span className="data-title">Date Joined</span>
                {allUsers.map((x: user) => {
                  return <span className="data-list">{GetDate(x.dateJoined)}</span>
                })}
              </div>
              <div className="data type">
                <span className="data-title">Location</span>
                {allUsers.map((x: user) => {
                  return <span className="data-list">{x.city}</span>
                })}
              </div>
             
            </div>
           
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
