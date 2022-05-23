import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./courses.scss";
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

function ManageCourses() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const navigate = useNavigate();

  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);

  const [updateName, setUpdateName] = useState<string>('');

  const [updateDuration, setUpdateDuration] = useState<string>('');

  const [updateDescription, setUpdateDescription] = useState<string>('');

  const [addName, setAddName] = useState<string>("");

  const [addDuration, setAddDuration] = useState<string>("");

  const [addDescription, setAddDescription] = useState<string>("");

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [courses, setCourses] = useState<course[]>([]);

  const getCourses = useCallback(() => {
    axios
      .get(`api/course/select`)
      .then((res) => {
        console.log("Response", res.data);
        setCourses(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function InsertCourse() {
    if (addDescription === "" || addDuration === "" || addName === "") {
      toast.error("All fields are required");
    } else {
      axios
        .post(
          `api/course/new?name=${addName}&description=${addDescription}&duration=${addDuration}`
        )
        .then(() => {
          toast.success("Course Added");
          getCourses();
        })
        .catch(() => {
          toast.error("Error Adding Course");
        });
    }
  }

  function DeleteCourse(id: number) {
    axios
      .delete(`api/course/delete?id=${id}`)
      .then(() => {
        toast.success("Course Deleted");
        getCourses();
      })
      .catch(() => {
        toast.error("Error Deleting Course");
      });
  }

  function EditCourseModal(x: course) {
    setUpdateName(x.name);
    setUpdateDescription(x.description);
    setUpdateDuration(x.duration)
    setSelectedCourseId(x.id);
    toggleShow();
  }

  function EditCourse(){
    axios
      .put(`api/course/update?id=${selectedCourseId}&name=${updateName}&duration=${updateDuration}&description=${updateDescription}`)
      .then(() => {
        toast.success("Course Updated");
        toggleShow();
        getCourses();
      })
      .catch(() => {
        toast.error("Error Updating Course");
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
              <span className="text">Courses Overview</span>
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
                    <MDBModalBody> <input
                  onChange={(e) => setUpdateName(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                  placeholder={updateName}
                />
                <br />
                <input
                  onChange={(e) => setUpdateDuration(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                  placeholder={updateDuration}
                />
                <br />
                <textarea
                  onChange={(e) => setUpdateDescription(e.currentTarget.value)}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder={updateDescription}
                  rows={3}
                /></MDBModalBody>

                    <MDBModalFooter>
                      <button onClick={() => EditCourse()} type="button" className="btn btn-primary">
                        <i className="uil uil-pen" /> Edit
                      </button>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
              <table className="table table-striped course-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((x: course) => {
                    return (
                      <tr>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td>{x.duration}</td>
                        <td>
                          <button
                            onClick={() => EditCourseModal(x)}
                            type="button"
                            className="btn btn-info"
                          >
                            <i className="uil uil-pen" />
                          </button>
                          <button
                            onClick={() => DeleteCourse(x.id)}
                            type="button"
                            className="btn btn-danger"
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
              <span className="text">Add Courses</span>
            </div>
          </div>
          <hr />
          <form>
            <div className="row">
              <div className="col">
                <input
                  onChange={(e) => setAddName(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
                <br />
                <input
                  onChange={(e) => setAddDuration(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                  placeholder="Duration"
                />
                <br />
                <button
                  onClick={() => InsertCourse()}
                  type="button"
                  className="btn btn-primary"
                >
                  <i className="uil uil-plus" /> Add Record
                </button>
              </div>
              <div className="col">
                <textarea
                  onChange={(e) => setAddDescription(e.currentTarget.value)}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="Description"
                  rows={3}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default ManageCourses;
