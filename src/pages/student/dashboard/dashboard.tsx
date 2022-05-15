import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./dashboard.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { user } from "../../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { module } from "../../../types/module";

function Dashboard() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [modules, setModules] = useState<module[]>([]);

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
            <li>
              <a href="#">
                <i className="uil uil-estate" />
                <span className="link-name">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="uil uil-file-download-alt" />
                <span className="link-name">Reporting</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="uil uil-book-open" />
                <span className="link-name">Modules</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="uil uil-trademark" />
                <span className="link-name">Assessments</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="uil uil-hourglass" />
                <span className="link-name">Classes</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="uil uil-clipboard-blank" />
                <span className="link-name">Attendance</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="uil uil-comments-alt" />
                <span className="link-name">Communication</span>
              </a>
            </li>
          </ul>
          <ul className="logout-mod">
            <li>
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
              <span className="text">Dashboard - Student</span>
            </div>
            <div className="boxes">
              <div className="box box1">
                <i className="uil uil-book" />
                <span className="text">Total Courses</span>
                <span className="number">0</span>
              </div>
              <div className="box box2">
                <i className="uil uil-user-md" />
                <span className="text">Total Lecturers</span>
                <span className="number">0</span>
              </div>
              <div className="box box3">
                <i className="uil uil-book-open" />
                <span className="text">My Modules</span>
                <span className="number">0</span>
              </div>
            </div>
          </div>
          <div className="activity">
            <div className="title">
              <i className="uil uil-stopwatch" />
              <span className="text">My Modules</span>
            </div>
            <div className="activity-data">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Module Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {modules.map((x: module) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{x.id}</th>
                          <td>{x.name}</td>
                          <td>{x.description}</td>
                        </tr>
                      </>
                    );
                  })} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
