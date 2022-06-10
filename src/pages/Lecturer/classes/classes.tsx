import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./classes.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { user } from "../../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { module } from "../../../types/module";
import { useNavigate } from "react-router-dom";
import { classes } from "../../../types/classes";

function Classes() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [modules, setModules] = useState<module[]>([]);

  const [day, setDay] = useState<string>('');

  const [module, setModule] = useState<number>(0);

  const [startTime, setStartTime] = useState<string>('');

  const [endTime, setEndTime] = useState<string>('');

  const [classes, setClasses] = useState<classes[]>([]);

  const navigate = useNavigate();

  const lectureModules = useCallback(() => {
    axios
      .get(`api/module/lecture/modules?lectureId=${userId}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("No modules found for this user"));
  }, []);

  const lectureClasses = useCallback(() => {
    axios
      .get(`api/classes/lecture?lectureId=${userId}`)
      .then((res) => {
        setClasses(res.data);
      })
      .catch(() => toast.warning("No classes scheduled"));
  }, []);

  useEffect(() => {
    lectureModules();
    lectureClasses();
  }, []);

  function AddClass() {
    axios
      .post(`api/classes/insert?lectureId=${userId}&moduleId=${module}&day=${day}&startTime=${startTime}&endTime=${endTime}`)
      .then(() => {
        toast.success('Class scheduled');
        lectureClasses();
      })
      .catch(() => toast.error("All fields are required"));
  }

  function DeleteClass(classId: number){
    axios
      .delete(`api/classes/delete?classId=${classId}`)
      .then(() => {
        toast.success('Class deleted');
        lectureClasses();
      })
      .catch(() => toast.error("Error"));
  }

  function Redirect(url: string) {
    navigate(url);
  }

  function ReturnModule(x: classes){
    var result: module[] = modules.filter((y: module) => y.id === x.moduleId)
    console.log(result);
      return result[0].name;
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
        <div className="dash-content">
          <div className="overview">
            <div className="title">
              <i className="uil uil-tachometer-fast" />
              <span className="text">My Classes</span>
            </div>
            <hr />
            {classes.length === 0 ? <i>No classes for this user</i> : <table className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Module</th>
                    <th scope="col">Day</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((x: classes) => {
                    return (
                      <tr>
                        <td>{x.id}</td>
                        <td>{ReturnModule(x)}</td>
                        <td>{x.day}</td>
                        <td>{x.timeStart}</td>
                        <td>{x.timeEnd}</td>
                        <td>
                          
                          <button
                            type="button"
                            className="btn btn-danger"
                           onClick={() => DeleteClass(x.id)}
                          >
                            <i className="uil uil-trash-alt" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>}
          </div>
          <div className="activity">
            <hr />
            <div className="title">
              <i className="uil uil-plus" />
              <span className="text">Create new class</span>
            </div>
            <hr />
            <div className="activity-data-classes-lecture">
              <div className="col">
                <h5>Class Day</h5>
                <select onChange={(e) => setDay(e.currentTarget.value)} className="form-control" id="exampleFormControlSelect1">
                  <option>-- Select --</option>
                  <option value={"Monday"}>Monday</option>
                  <option value={"Tuesday"}>Tuesday</option>
                  <option value={"Wednesaday"}>Wednesaday</option>
                  <option value={"Thursday"}>Thursday</option>
                  <option value={"Friday"}>Friday</option>
                </select>
                <br />
                <h5>Module</h5>
                <select onChange={(e) => setModule(parseInt(e.currentTarget.value))} className="form-control" id="exampleFormControlSelect1">
                 <option>-- Select --</option>
                 {modules.map((x: module) => {
                   return(
                     <option value={x.id}>{x.name}</option>
                   )
                 })}
                </select>
                <br />
                <h5>Start Time</h5>
                <select onChange={(e) => setStartTime(e.currentTarget.value)} className="form-control" id="exampleFormControlSelect1">
                  <option>-- Select --</option>
                  <option value={'08:00'}>08:00</option>
                  <option value={'09:00'}>09:00</option>
                  <option value={'10:00'}>10:00</option>
                  <option value={'11:00'}>11:00</option>
                  <option value={'12:00'}>12:00</option>
                  <option value={'13:00'}>13:00</option>
                  <option value={'14:00'}>14:00</option>
                  <option value={'15:00'}>15:00</option>
                </select>
                <br />
                <h5>End Time</h5>
                <select onChange={(e) => setEndTime(e.currentTarget.value)} className="form-control" id="exampleFormControlSelect1">
                  <option>-- Select --</option>
                <option value={'09:00'}>09:00</option>
                  <option value={'10:00'}>10:00</option>
                  <option value={'11:00'}>11:00</option>
                  <option value={'12:00'}>12:00</option>
                  <option value={'13:00'}>13:00</option>
                  <option value={'14:00'}>14:00</option>
                  <option value={'15:00'}>15:00</option>
                  <option value={'16:00'}>16:00</option>
                </select>
                <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => AddClass()}
                >
                  <i className="uil uil-plus" /> Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Classes;
