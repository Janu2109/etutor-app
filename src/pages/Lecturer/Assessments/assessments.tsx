import { useCallback, useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import "./assessments.scss";
import Icon from "../../../images/man.png";
import axios from "../../../types/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { module } from "../../../types/module";
import { user } from "../../../types/user";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

function LectureAssessments() {
  const userId: user[] = useSelector((state: RootState) => state.user.value);

  const [view, setView] = useState("");

  const [item1Show, setItem1Show] = useState(false);

  const [item2Show, setItem2Show] = useState(false);

  const [item3Show, setItem3Show] = useState(false);

  const [item4Show, setItem4Show] = useState(false);

  const [item5Show, setItem5Show] = useState(false);

  console.log(view);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(true);

  const [modules, setModules] = useState<module[]>([]);

  const [moduleId, setSelectedModule] = useState<number>(0);

  const [title, setTitle] = useState<string>('');

  const [questionOneQ, setQuestionOneQ] = useState<string>('');

  const [questionOneA, setQuestionOneA] = useState<string>('');

  const [questionOneO, setQuestionOneO] = useState<string>('');

  const [questionTwoQ, setQuestionTwoQ] = useState<string>('');

  const [questionTwoA, setQuestionTwoA] = useState<string>('');

  const [questionTwoO, setQuestionTwoO] = useState<string>('');

  const [questionThreeQ, setQuestionThreeQ] = useState<string>('');

  const [questionThreeA, setQuestionThreeA] = useState<string>('');

  const [questionThreeO, setQuestionThreeO] = useState<string>('');

  const [questionFourQ, setQuestionFourQ] = useState<string>('');

  const [questionFourA, setQuestionFourA] = useState<string>('');

  const [questionFourO, setQuestionFourO] = useState<string>('');

  const [questionFiveQ, setQuestionFiveQ] = useState<string>('');

  const [questionFiveA, setQuestionFiveA] = useState<string>('');

  const [questionFiveO, setQuestionFiveO] = useState<string>('');

  function AddAssessment(){
    axios
      .post(`api/assessments/insert?moduleId=${moduleId}&title=${title}&questionOneQ=${questionOneQ}&questionOneA=${questionOneA}&questionOneO=${questionOneO}&questionTwoQ=${questionTwoQ}&questionTwoA=${questionTwoA}&questionTwoO=${questionTwoO}&questionThreeQ=${questionThreeQ}&questionThreeA=${questionThreeA}&questionThreeO=${questionThreeO}&questionFourQ=${questionFourQ}&questionFourA=${questionFourA}&questionFourO=${questionFourO}&questionFiveQ=${questionFiveQ}&questionFiveA=${questionFiveA}&questionFiveO=${questionFiveO}`)
      .then((res) => {
        toast.success('Assessment Added')
      })
      .catch(() => toast.error("Error"));
  }

  const getModules = useCallback(() => {
    axios
      .get(`api/module/lecture/modules?lectureId=${userId}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch(() => toast.error("Error loading data"));
  }, []);

  useEffect(() => {
    getModules();
  }, []);

  function Redirect(url: string) {
    navigate(url);
  }

  return (
    <div
      className={
        isDarkMode
          ? "lecture-attendance-container dark-mode"
          : "lecture-attendance-container"
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
        <div className="dash-content-reporting">
          <div className="overview">
            <div className="title">
              <i className="uil uil-tachometer-fast" />
              <span className="text">Assessments</span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <select
                onChange={(e) =>
                  setSelectedModule(parseInt(e.currentTarget.value))
                }
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option>-- Select Module--</option>
                {modules.map((x: module) => {
                  return <option value={x.id}>{x.name}</option>;
                })}
              </select>
            </div>
            <div className="col">
            <input onChange={(e) => setTitle(e.currentTarget.value)} className="form-control" type="text" placeholder="Assessment Title"/>
            </div>
            <div className="col">
              <button onClick={() => AddAssessment()} type="button" className="btn btn-primary">
                <i className="uil uil-upload" /> Upload Assessment
              </button>
            </div>
            <br />
            <br />
            <div id="accordion">
              <div className="card">
                <div onClick={() => setItem1Show(!item1Show)} className="card-header" id="headingOne">
                  <h5 className="mb-0">
                        <span className="black">Question 1</span>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className={item1Show === true ? 'card-body' : 'card-body hidden'}>
                  <input onChange={(e) => setQuestionOneQ(e.currentTarget.value)} className="form-control" type="text" placeholder="Question"/>
                  <br />
                  <input onChange={(e) => setQuestionOneA(e.currentTarget.value)} className="form-control" type="text" placeholder="Correct Answer"/>
                  <br />
                  <input onChange={(e) => setQuestionOneO(e.currentTarget.value)} className="form-control" type="text" placeholder="Optional Answer"/>
                  </div>
                </div>
              </div>
              <div className="card">
                <div onClick={() => setItem2Show(!item2Show)} className="card-header" id="headingOne">
                  <h5 className="mb-0">
                      <span className="black">Question 2</span>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse show"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className={item2Show === true ? 'card-body' : 'card-body hidden'}>
                  <input onChange={(e) => setQuestionTwoQ(e.currentTarget.value)} className="form-control" type="text" placeholder="Question"/>
                  <br />
                  <input onChange={(e) => setQuestionTwoA(e.currentTarget.value)} className="form-control" type="text" placeholder="Correct Answer"/>
                  <br />
                  <input onChange={(e) => setQuestionTwoO(e.currentTarget.value)} className="form-control" type="text" placeholder="Optional Answer"/>
                  </div>
                </div>
              </div>
              <div className="card">
                <div onClick={() => setItem3Show(!item3Show)} className="card-header" id="headingThree">
                  <h5 className="mb-0">
                  <span className="black">Question 3</span>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse show"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className={item3Show === true ? 'card-body' : 'card-body hidden'}>
                  <input onChange={(e) => setQuestionThreeQ(e.currentTarget.value)} className="form-control" type="text" placeholder="Question"/>
                  <br />
                  <input onChange={(e) => setQuestionThreeA(e.currentTarget.value)} className="form-control" type="text" placeholder="Correct Answer"/>
                  <br />
                  <input onChange={(e) => setQuestionThreeO(e.currentTarget.value)} className="form-control" type="text" placeholder="Optional Answer"/>
                  </div>
                </div>
              </div>
              <div className="card">
                <div onClick={() => setItem4Show(!item4Show)} className="card-header" id="headingThree">
                  <h5 className="mb-0">
                  <span className="black">Question 4</span>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse show"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className={item4Show === true ? 'card-body' : 'card-body hidden'}>
                  <input onChange={(e) => setQuestionFourQ(e.currentTarget.value)} className="form-control" type="text" placeholder="Question"/>
                  <br />
                  <input onChange={(e) => setQuestionFourA(e.currentTarget.value)} className="form-control" type="text" placeholder="Correct Answer"/>
                  <br />
                  <input onChange={(e) => setQuestionFourO(e.currentTarget.value)} className="form-control" type="text" placeholder="Optional Answer"/>
                  </div>
                </div>
              </div>
              <div className="card">
                <div onClick={() => setItem5Show(!item5Show)} className="card-header" id="headingThree">
                  <h5 className="mb-0">
                  <span className="black">Question 5</span>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse show"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className={item5Show === true ? 'card-body' : 'card-body hidden'}>
                  <input onChange={(e) => setQuestionFiveQ(e.currentTarget.value)} className="form-control" type="text" placeholder="Question"/>
                  <br />
                  <input onChange={(e) => setQuestionFiveA(e.currentTarget.value)} className="form-control" type="text" placeholder="Correct Answer"/>
                  <br />
                  <input onChange={(e) => setQuestionFiveO(e.currentTarget.value)} className="form-control" type="text" placeholder="Optional Answer"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default LectureAssessments;
