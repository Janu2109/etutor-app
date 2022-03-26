import { useState } from "react";
import Sidebar from "../../../components/admin/sidebar/sidebar";
import Header from "../../../components/Navbar/index";
import logo from "../../../images/logo.png";
import "./dashboard.scss";

function Dashboard() {

const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  return (
    <div className={isDarkMode ? "admin-dash-container dark-mode" : "admin-dash-container"}>
      <nav id="adminNav" className={sideNavToggle ? "" : "nav-closed"}>
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
                <i className="uil uil-chart-line" />
                <span className="link-name">Analytics</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="uil uil-edit" />
                <span className="link-name">Manage</span>
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
              <div className="mode-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
              <span className="switch"></span>
              </div>
              
            </li>
          </ul>
        </div>
      </nav>

    <section className="dashboard">
        <div className="top">
        <i className="uil uil-list-ul sidebar-toggle" onClick={() => setSideNavToggle(!sideNavToggle)}/>
        <div className="search-box">
        <i className="uil uil-search"/>
            <input type="text" placeholder="Search here..."/>
        </div>
        </div>
    </section>

    </div>
  );
}

export default Dashboard;
