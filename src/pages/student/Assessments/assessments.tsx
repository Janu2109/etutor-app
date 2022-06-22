import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./assessments.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { user } from "../../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { module } from "../../../types/module";
import { assessments } from "../../../types/assessments";

function StudentAssessments() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [modules, setModules] = useState<module[]>([]);

  const [selectedModule, setSelectedModule] = useState<number>(0);

  const [assessments, setAssessments] = useState<assessments[]>([]);

  const [filteredData, setFilteredData] = useState<assessments[]>([]);

  const [view, setView] = useState<number>(0);

  const [quizMark, setQuizMark] = useState<any>(0);

  const [quizData, setQuizData] = useState<any>({
    id: 0,
    moduleId: 0,
    questionFiveA: "",
    questionFiveO: "",
    questionFiveQ: "",
    questionFourA: "",
    questionFourO: "",
    questionFourQ: "",
    questionOneA: "",
    questionOneO: "",
    questionOneQ: "",
    questionThreeA: "",
    questionThreeO: "",
    questionThreeQ: "",
    questionTwoA: "",
    questionTwoO: "",
    questionTwoQ: "",
    title: "",
  });

  const [q1a, setQ1a] = useState<string>("");

  const [q2a, setQ2a] = useState<string>("");

  const [q3a, setQ3a] = useState<string>("");

  const [q4a, setQ4a] = useState<string>("");

  const [q5a, setQ5a] = useState<string>("");

  const navigate = useNavigate();

  const myModules = useCallback(() => {
    axios
      .get(`api/module/student/modules?userId=${userId}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("You are not enrolled"));
  }, []);

  const myAssessments = useCallback(() => {
    axios.get(`api/assessments/select`).then((res) => {
      setAssessments(res.data);
      console.log("My assessments", res.data);
    });
  }, []);

  const [item1Show, setItem1Show] = useState(false);

  const [item2Show, setItem2Show] = useState(false);

  const [item3Show, setItem3Show] = useState(false);

  const [item4Show, setItem4Show] = useState(false);

  const [item5Show, setItem5Show] = useState(false);

  let mark: number = 0;

  useEffect(() => {
    myModules();
    myAssessments();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  function ModuleSelected(e: any) {
    setSelectedModule(e.currentTarget.value);
    let data: assessments[] = assessments.filter(
      (x: assessments) => x.moduleId === parseInt(e.currentTarget.value)
    );
    setFilteredData(data);
  }

  function AttemptQuiz(x: assessments) {
    setQuizData(x);
    setView(1);
  }

  const titleObj = {
    width: "78vw",
  };

  function SubmitAnswers(){
    if(q1a === quizData.questionOneA){
      mark += 1;
    }
    if(q2a === quizData.questionTwoA){
      mark += 1;
    }
    if(q3a === quizData.questionThreeA){
      mark += 1;
    }
    if(q4a === quizData.questionFourA){
      mark += 1;
    }
    if(q5a === quizData.questionFiveA){
      mark += 1;
    }
    mark = mark * 100 / 5;
    setQuizMark(mark);
    setView(0);
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
            <li onClick={() => Redirect("/student")}>
              <a href="#">
                <i className="uil uil-estate" />
                <span className="link-name">Dashboard</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/reporting")}>
              <a href="#">
                <i className="uil uil-file-download-alt" />
                <span className="link-name">Reporting</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/courses")}>
              <a href="#">
                <i className="uil uil-book-open" />
                <span className="link-name">Courses</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/assessments")}>
              <a href="#">
                <i className="uil uil-trademark" />
                <span className="link-name">Assessments</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/classes")}>
              <a href="#">
                <i className="uil uil-hourglass" />
                <span className="link-name">Classes</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/studyMaterial")}>
              <a href="#">
                <i className="uil uil-clipboard-blank" />
                <span className="link-name">Study Material</span>
              </a>
            </li>
            <li onClick={() => Redirect("/student/communication")}>
              <a href="#">
                <i className="uil uil-comments-alt" />
                <span className="link-name">Communication</span>
              </a>
            </li>
          </ul>
          <ul className="logout-mod">
            <li onClick={() => Redirect("/student/profile")}>
              <a href="#">
                <i className="uil uil-user-circle" />
                <span className="link-name">Profile</span>
              </a>
            </li>
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
          {view === 0 && (
            <>
           {quizMark > 0 && <h4>You Scored: {quizMark}%</h4>}
              <div className="overview">
                <div className="title">
                  <i className="uil uil-tachometer-fast" />
                  <span className="text">Assessments</span>
                </div>
                <div className="boxes">
                  <select
                    onChange={(e) => ModuleSelected(e)}
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option>-- Select Module --</option>
                    {modules.map((x: module) => {
                      return <option value={x.id}>{x.name}</option>;
                    })}
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="activity">
            <div className="title">
              <i className="uil uil-edit" />
              <span className="text">Take Quiz</span>
            </div>
            <div className="activity-data">
              {view === 0 && (
                <>
                  {selectedModule === 0 ? (
                    <i>No module selected, Please select a module</i>
                  ) : (
                    <></>
                  )}
                  {filteredData.length > 0 && (
                    <>
                      <table
                        id="moduleTbl"
                        className="table table-striped course-table"
                      >
                        <thead>
                          <tr>
                            <th scope="col">Quiz Title</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((x: assessments) => {
                            return (
                              <>
                                <tr>
                                  <td style={titleObj}>{x.title}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => AttemptQuiz(x)}
                                    >
                                      Attempt Quiz
                                    </button>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </>
              )}
              {view === 1 && (
                <>
                  <div className="row">
                    <div className="col" style={titleObj}>
                      <button onClick={() => SubmitAnswers()} type="button" className="btn btn-primary">
                        Submit Answers
                      </button>
                      <br />
                    </div>
                    <br />
                    <div
                      id="accordion"
                      className="student-assessment-accordion"
                      
                    >
                      <br />
                      <div className="card">
                        <div
                          onClick={() => setItem1Show(!item1Show)}
                          className="card-header"
                          id="headingOne"
                        >
                          <h5 className="mb-0">
                            <span className="black">
                              {quizData.questionOneQ}
                            </span>
                          </h5>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div
                            className={
                              item1Show === true
                                ? "card-body"
                                : "card-body hidden"
                            }
                          >
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ1a(e.currentTarget.value)}
                                value={quizData.questionOneA}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a1"
                              >
                                {quizData.questionOneA}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ1a(e.currentTarget.value)}
                                value={quizData.questionOneO}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionOneO}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          onClick={() => setItem2Show(!item2Show)}
                          className="card-header"
                          id="headingOne"
                        >
                          <h5 className="mb-0">
                            <span className="black">
                              {quizData.questionTwoQ}
                            </span>
                          </h5>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse show"
                          aria-labelledby="headingTwo"
                          data-parent="#accordion"
                        >
                          <div
                            className={
                              item2Show === true
                                ? "card-body"
                                : "card-body hidden"
                            }
                          >
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ2a(e.currentTarget.value)}
                                value={quizData.questionTwoA}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionTwoA}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ2a(e.currentTarget.value)}
                                value={quizData.questionTwoO}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionTwoO}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          onClick={() => setItem3Show(!item3Show)}
                          className="card-header"
                          id="headingThree"
                        >
                          <h5 className="mb-0">
                            <span className="black">
                              {quizData.questionThreeQ}
                            </span>
                          </h5>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse show"
                          aria-labelledby="headingThree"
                          data-parent="#accordion"
                        >
                          <div
                            className={
                              item3Show === true
                                ? "card-body"
                                : "card-body hidden"
                            }
                          >
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ3a(e.currentTarget.value)}
                                value={quizData.questionThreeA}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionThreeA}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ3a(e.currentTarget.value)}
                                value={quizData.questionThreeO}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionThreeO}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          onClick={() => setItem4Show(!item4Show)}
                          className="card-header"
                          id="headingThree"
                        >
                          <h5 className="mb-0">
                            <span className="black">
                              {quizData.questionFourQ}
                            </span>
                          </h5>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse show"
                          aria-labelledby="headingThree"
                          data-parent="#accordion"
                        >
                          <div
                            className={
                              item4Show === true
                                ? "card-body"
                                : "card-body hidden"
                            }
                          >
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ4a(e.currentTarget.value)}
                                value={quizData.questionFourA}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionFourA}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ4a(e.currentTarget.value)}
                                value={quizData.questionFourO}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionFourO}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          onClick={() => setItem5Show(!item5Show)}
                          className="card-header"
                          id="headingThree"
                        >
                          <h5 className="mb-0">
                            <span className="black">
                              {quizData.questionFiveQ}
                            </span>
                          </h5>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse show"
                          aria-labelledby="headingThree"
                          data-parent="#accordion"
                        >
                          <div
                            className={
                              item5Show === true
                                ? "card-body"
                                : "card-body hidden"
                            }
                          >
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ5a(e.currentTarget.value)}
                                value={quizData.questionFiveA}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionFiveA}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onChange={(e) => setQ5a(e.currentTarget.value)}
                                value={quizData.questionFiveO}
                                type="checkbox"
                                className="form-check-input"
                                id="q1a2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="q1a2"
                              >
                                {quizData.questionFiveO}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default StudentAssessments;
