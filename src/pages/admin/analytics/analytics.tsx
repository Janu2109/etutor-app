import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./analytics.scss";
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

function AdminAnalytics() {
  const [basicModal, setBasicModal] = useState(false);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

  const [modules, setModules] = useState<module[]>([]);

  const [users, setUsers] = useState<user[]>([]);

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

  var students = users.filter((x: user) => x.isStudent === true);

  var lecturers = users.filter((x: user) => x.isLecturer === true);

  var admins = users.filter((x: user) => x.isAdministrator === true);

  const getModules = useCallback(() => {
    axios
      .get(`api/module/select`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    getCourses();
    getModules();
    getUsers();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  const courseOptions = {
    darkMode: 'auto',
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0%',
      left: 'center'
    },
    series: [
      {
        height: '300',
        name: 'Courses and Modules',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: courses.length, name: 'Courses' },
          { value: modules.length, name: 'Modules' }
        ]
      }
    ]
  }

  const usersOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0%',
      left: 'center'
    },
    series: [
      {
        height: '300',
        name: 'Users',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: students.length, name: 'Students' },
          { value: lecturers.length, name: 'Lecturers' },
          { value: admins.length, name: 'Admins'}
        ]
      }
    ]
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
        <div className="dash-content-analytics">
          <div className="overview">
            <div className="title">
              <i className="uil uil-tachometer-fast" />
              <span className="text">Analytics</span>
            </div>
          </div>
          <hr />
          <div className="left">
          <ReactECharts option={courseOptions}/>
          </div>
          <div className="right">
          <ReactECharts option={usersOptions}/>
          </div>
          <div className="left">
          <ReactPlayer url={'https://www.youtube.com/watch?v=Lh6frjuGuZM'} width={'200%'} height={'600px'} controls={true}/>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default AdminAnalytics;
