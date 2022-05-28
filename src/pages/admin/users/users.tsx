import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./users.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { user } from "../../../types/user";

function Users() {

  const [userId, setUserId] = useState<number>(0);

  const [role, setRole] = useState<number>(0);

  const [firstName, setFirstName] = useState<string>('First Name');

  const [lastName, setLastName] = useState<string>('Last Name');

  const navigate = useNavigate();

  const [users, setUsers] = useState<user[]>([]);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const getUsers = useCallback(() => {
    axios
      .get(`api/user/all`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {
        toast.error("Error Fetching Users");
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function UpdateRole() {
      if(role === 1){
        axios
        .put(
          `api/user/role?userId=${userId}&isStudent=${true}&isLecture=${false}&isAdmin=${false}`
        )
        .then(() => {
          toast.success("User role updated");
          getUsers();
        })
        .catch(() => {
          toast.error("Error updating role");
        });
      }else if(role === 2){
        axios
        .put(
          `api/user/role?userId=${userId}&isStudent=${false}&isLecture=${true}&isAdmin=${false}`
        )
        .then(() => {
            toast.success("User role updated");
            getUsers();
          })
          .catch(() => {
            toast.error("Error updating role");
        });
      }else if(role === 3){
        axios
        .put(
          `api/user/role?userId=${userId}&isStudent=${false}&isLecture=${false}&isAdmin=${true}`
        )
        .then(() => {
            toast.success("User role updated");
            getUsers();
          })
          .catch(() => {
            toast.error("Error updating role");
        });
      }
  }

  function DeleteUser(x: number) {
    axios
      .delete(`api/module/delete?moduleId=${x}`)
      .then(() => {
        toast.success("Module deleted");
      })
      .catch(() => {
        toast.error("Error deleting module");
      });
  }

 
function ReturnRole(x: user){
    if(x.isStudent === true){
        return 'Student';
    }else if(x.isLecturer === true){
        return 'Lecturer';
    }else return 'Admin';
}
 
function SetUpdateInfo(x: user){
    setFirstName(x.firstName);
    setLastName(x.lastName);
    setUserId(x.id);
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
        <div className="dash-content">
          <div className="overview">
            <div className="title">
              <i className="uil uil-tachometer-fast" />
              <span className="text">Users Overview</span>
            </div>
          </div>
          <hr />
          <div className="activity">
            <div className="activity-data">
              <hr />
             
              <table className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">City</th>
                    
                    <th scope="col">Role</th>
                    <th scope="col"></th>
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
                        <td>
                          <button
                            onClick={() => SetUpdateInfo(x)}
                            type="button"
                            className="btn btn-info"
                          >
                            <i className="uil uil-pen" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => DeleteUser(x.id)}
                          >
                            <i className="uil uil-trash-alt" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="overview">
            <div className="title">
              <i className="uil uil-edit" />
              <span className="text">Edit User Role</span>
            </div>
          </div>
          <hr />
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder={firstName}
                />
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder={lastName}
                />
                <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => UpdateRole()}
                >
                  <i className="uil uil-pen" /> Edit User
                </button>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  onChange={(e) =>
                    setRole(parseInt(e.currentTarget.value))
                  }
                >
                  <option disabled={false}>-- Select Role --</option>
                  <option value={1}>
                      Student
                  </option>
                  <option value={2}>
                      Lecturer
                  </option>
                  <option value={3}>
                      Admin
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Users;
