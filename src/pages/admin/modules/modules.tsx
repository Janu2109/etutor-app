import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./modules.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { course } from "../../../types/course";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { module } from "../../../types/module";
import { lecture } from "../../../types/lecture";
import { user } from "../../../types/user";

function Modules() {
  const [basicModal, setBasicModal] = useState(false);

  const [addName, setAddName] = useState<string>("");

  const [updateSelectedModuleId, setUpdateSelectedModuleId] =
    useState<number>(0);

  const [addDesc, setAddDesc] = useState<string>("");

  const [addLecture, setAddLecture] = useState<number>(0);

  const [addCourse, setAddCourse] = useState<number>(0);

  const toggleShow = () => setBasicModal(!basicModal);

  const navigate = useNavigate();

  const [courses, setCourses] = useState<course[]>([]);

  const [lectures, setLectures] = useState<user[]>([]);

  const [updateName, setUpdateName] = useState<string>("");

  const [updateDescription, setUpdateDescription] = useState<string>("");

  const [updateLecture, setUpdateLecture] = useState<number>(0);

  const [updateCourse, setUpdateCourse] = useState<number>(0);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [modules, setModules] = useState<module[]>([]);

  const getModules = useCallback(() => {
    axios
      .get(`api/module/select`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getCourses = useCallback(() => {
    axios
      .get(`api/course/select`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  const getLecturers = useCallback(() => {
    axios
      .get(`api/user/lecturers`)
      .then((res) => {
        setLectures(res.data);
      })
      .catch(() => {
        toast.error("Error Fetching Users");
      });
  }, []);

  useEffect(() => {
    getModules();
    getCourses();
    getLecturers();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function InsertModule() {
    axios
      .post(
        `api/module/new?name=${addName}&description=${addDesc}&lectureId=${addLecture}&courseId=${addCourse}`
      )
      .then(() => {
        toast.success("New module added");
        getModules();
      })
      .catch(() => {
        toast.error("Error adding module");
      });
  }

  function DeleteModule(x: number) {
    axios
      .delete(`api/module/delete?moduleId=${x}`)
      .then(() => {
        toast.success("Module deleted");
        getModules();
      })
      .catch(() => {
        toast.error("Error deleting module");
      });
  }

  function EditModuleModal(x: module) {
    setUpdateName(x.name);
    setUpdateDescription(x.description);
    setUpdateSelectedModuleId(x.id);
    setUpdateCourse(x.courseId);
    setUpdateLecture(x.lectureId);
    toggleShow();
  }

  function UpdateModule() {
    axios
      .put(
        `api/module/update?moduleId=${updateSelectedModuleId}&name=${updateName}&description=${updateDescription}&lectureId=${updateLecture}&courseId=${updateCourse}`
      )
      .then(() => {
        toast.success("Module updated");
        getModules();
        toggleShow();
      })
      .catch(() => {
        toast.error("Error updating module");
      });
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
              <span className="text">Modules Overview</span>
            </div>
          </div>
          <hr />
          <div className="activity">
            <div className="activity-data">
              <hr />
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>Update Course Info</MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      {" "}
                      <input
                        onChange={(e) => setUpdateName(e.currentTarget.value)}
                        type="text"
                        className="form-control"
                        placeholder={updateName}
                      />
                      <br />
                      <textarea
                        onChange={(e) =>
                          setUpdateDescription(e.currentTarget.value)
                        }
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        placeholder={updateDescription}
                        rows={3}
                      />
                      <br />
                      <select
                        className="form-control"
                        onChange={(e) =>
                          setUpdateLecture(parseInt(e.currentTarget.value))
                        }
                      >
                        <option disabled={false}>--Select Lecture--</option>
                        {lectures.map((x: user) => {
                          return (
                            <option value={x.id}>
                              {x.firstName} {x.lastName}
                            </option>
                          );
                        })}
                      </select>
                      <br />
                      <select
                        className="form-control"
                        onChange={(e) =>
                          setUpdateCourse(parseInt(e.currentTarget.value))
                        }
                      >
                        <option disabled={false}>--Select Course--</option>
                        {courses.map((x: course) => {
                          return <option value={x.id}>{x.name}</option>;
                        })}
                      </select>
                    </MDBModalBody>

                    <MDBModalFooter>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => UpdateModule()}
                      >
                        <i className="uil uil-pen" /> Edit
                      </button>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
              <table className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Lecture</th>
                    <th scope="col">Course</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((x: module) => {
                    return (
                      <tr>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td>{x.lectureId}</td>
                        <td>{x.courseId}</td>
                        <td>
                          <button
                            onClick={() => EditModuleModal(x)}
                            type="button"
                            className="btn btn-info"
                          >
                            <i className="uil uil-pen" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => DeleteModule(x.id)}
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
              <i className="uil uil-plus" />
              <span className="text">Add Module</span>
            </div>
          </div>
          <hr />
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setAddName(e.currentTarget.value)}
                />
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  onChange={(e) => setAddDesc(e.currentTarget.value)}
                />
                <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => InsertModule()}
                >Add Record
                </button>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  onChange={(e) =>
                    setAddLecture(parseInt(e.currentTarget.value))
                  }
                >
                  <option disabled={false}>--Select Lecture--</option>
                  {lectures.map((x: user) => {
                    return (
                      <option value={x.id}>
                        {x.firstName} {x.lastName}
                      </option>
                    );
                  })}
                </select>
                <br />
                <select
                  className="form-control"
                  onChange={(e) =>
                    setAddCourse(parseInt(e.currentTarget.value))
                  }
                >
                  <option disabled={false}>--Select Course--</option>
                  {courses.map((x: course) => {
                    return <option value={x.id}>{x.name}</option>;
                  })}
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

export default Modules;
