import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./files.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { user } from "../../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { module } from "../../../types/module";
import { useNavigate } from "react-router-dom";
import { classes } from "../../../types/classes";
import { files } from "../../../types/files";

function LectureFiles() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [modules, setModules] = useState<module[]>([]);

  const [module, setModule] = useState<number>(0);

  const [classes, setClasses] = useState<classes[]>([]);

  const [pdfName, setPdfName] = useState<string>('');

  const [files, setFiles] = useState<files[]>([]);

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

  const lectureFiles = useCallback(() => {
    axios
      .get(`api/files/lecture?lectureId=${userId}`)
      .then((res) => {
        setFiles(res.data);
      })
      .catch(() => toast.warning("No files found"));
  }, []);

  useEffect(() => {
    lectureModules();
    lectureClasses();
    lectureFiles();
  }, []);

  function AddFile() {
    axios
      .post(
        `api/files/new?name=${pdfName}&moduleId=${module}&userId=${userId}`
      )
      .then(() => {
        toast.success("File Uploaded");
        lectureFiles();
      })
      .catch(() => toast.error("Error uploading file"));
  }

  function DeleteFile(fileId: number) {
    axios
      .delete(`api/files/delete?fileId=${fileId}`)
      .then(() => {
        toast.success("File deleted");
        lectureFiles();
      })
      .catch(() => toast.error("Error deleting file"));
  }

  function Redirect(url: string) {
    navigate(url);
  }

  function ReturnModule(x: number) {
    var result: module[] = modules.filter((y: module) => y.id === x);
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
              <i className="uil uil-plus" />
              <span className="text">New Files</span>
            </div>
            <hr />
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={(e) => setPdfName(e.currentTarget.files![0].name)}
                />
              </div>
            </div>
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => AddFile()}
            >
              <i className="uil uil-upload" /> Upload File
            </button>
          </div>
          <div className="activity">
            <hr />
            <div className="title">
              <i className="uil uil-tachometer-fast" />
              <span className="text">My Files</span>
            </div>

            <hr />
            <div className="activity-data-classes-lecture">
              <div className="col">
                {files.length === 0 ? (
                  <i>No files for this user</i>
                ) : (
                  <table className="table table-striped course-table lecture-file-table">
                    <thead>
                      <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">Module</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((x: files) => {
                        return (
                          <tr>
                            <td>{x.name}</td>
                            <td>{ReturnModule(x.moduleId)}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => DeleteFile(x.id)}
                              >
                                <i className="uil uil-trash-alt" />
                              </button>
                             
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default LectureFiles;
