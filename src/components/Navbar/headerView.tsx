import "./header.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDashboard, faDoorOpen, faTimes } from "@fortawesome/free-solid-svg-icons";

function HeaderView({ ...props }) {
  
  const navigate = useNavigate();

  function doDashboard() {
    navigate("/admin");
  }

  function doScanning() {
    navigate("/scanning");
  }

  function doCuttingScreen() {
    navigate("/cuttingscreen");
  }
  function doCuttingQueue() {
    navigate("/cuttingqueue");
  }

  function doReviewQueue() {
    navigate("/reviewqueue");
  }

  function doReviewScreen() {
    navigate("/reviewscreen");
  }

  function doManagementIssues() {
    navigate("/managementissue");
  }

  function doManagementQueueCutting() {
    navigate("/management-queue-cutting");
  }

  function doManagementQueueReviews() {
    navigate("/management-queue-reviews");
  }

  function doManagementCopy() {
    navigate("/management-copy");
  }

  function doManagementBacksearch() {
    navigate("/management-backsearch");
  }

  function doManagementHistory() {
    navigate("/management-history");
  }

  function doManagementPublication() {
    navigate("/management-publication");
  }

  function doManagementMonitors() {
    navigate("/management-monitors");
  }

  function doManagementResegment() {
    navigate("/management-resegment");
  }

  function doPageRestore() {
    navigate("/management-pagerestore");
  }

  function doViewScans() {
    navigate("/viewscans");
  }

  function LogOut() {
    navigate("/#");
  }
  return (
    <header>
      <FontAwesomeIcon icon={faBars} color="black" onClick={() => props.setExpanded(!props.expanded)}/>
      <img src={logo} alt="Logo" />
      <h1>E-Tutor</h1>
      <div id="sidenav" className={props.expanded ? "open" : ""}>
        <ul>
          <li>
          <FontAwesomeIcon icon={faDashboard } color="black" />
            <span onClick={doDashboard}>Dashboard</span>
          </li>
          <li>
            <i className="fal fa-qrcode"></i>
            <span onClick={doScanning}>Scanning</span>
          </li>
          <li>
            <i className="fal fa-cut"></i>
            <span>Cutting</span>
            <i
              className="far fa-angle-right"
              onClick={(e: any) => props.toggleItem(e.target)}
            ></i>
            <ul className="dropdown">
              <li>
                <i className="fal fa-desktop"></i>
                <span onClick={doCuttingScreen}>Screen</span>
              </li>
              <li>
                <i className="fal fa-pencil"></i>
                <span onClick={doCuttingQueue}>Queue</span>
              </li>
            </ul>
          </li>
          <li>
            <i className="fal fa-arrows"></i>
            <span>Reviews</span>
            <i
              className="far fa-angle-right"
              onClick={(e: any) => props.toggleItem(e.target)}
            ></i>
            <ul className="dropdown">
              <li>
                <i className="fal fa-desktop"></i>
                <span onClick={doReviewScreen}>Screen</span>
              </li>
              <li>
                <i className="fal fa-cut"></i>
                <span onClick={doReviewQueue}>Queue</span>
              </li>
            </ul>
          </li>
          <li>
            <i className="fal fa-wrench"></i>
            <span>Management</span>
            <i
              className="far fa-angle-right"
              onClick={(e: any) => props.toggleItem(e.target)}
            ></i>
            <ul className="dropdown">
              <li>
                <i className="fal fa-exclamation-triangle"></i>
                <span onClick={doManagementIssues}>Issue</span>
              </li>
              <li>
                <i className="fal fa-edit"></i>
                <span>Queue</span>
                <i
                  className="far fa-angle-right"
                  onClick={(e: any) => props.toggleItem(e.target)}
                ></i>
                <ul className="dropdown">
                  <li>
                    <i className="fal fa-cut"></i>
                    <span onClick={doManagementQueueCutting}>Cutting</span>
                  </li>
                  <li>
                    <i className="fal fa-pencil"></i>
                    <span onClick={doManagementQueueReviews}>Review</span>
                  </li>
                </ul>
              </li>
              <li>
                <i className="fal fa-clone"></i>
                <span onClick={doManagementCopy}>Copy</span>
              </li>
              <li>
                <i className="fal fa-search"></i>
                <span onClick={doManagementBacksearch}>Backsearch</span>
              </li>
              <li>
                <i className="fal fa-history"></i>
                <span onClick={doManagementHistory}>History</span>
              </li>
              <li>
                <i className="fal fa-flag"></i>
                <span onClick={doManagementPublication}>Publication notes</span>
              </li>
              <li>
                <i className="fal fa-signal"></i>
                <span onClick={doManagementMonitors}>Monitors</span>
              </li>
              <li>
                <i className="fal fa-reply-all"></i>
                <span onClick={doManagementResegment}>Resegment</span>
              </li>
              <li>
                <i className="fal fa-retweet"></i>
                <span onClick={doPageRestore}>Page Restore</span>
              </li>
            </ul>
          </li>
          <li>
            <i className="fal fa-qrcode"></i>
            <span onClick={doViewScans}>View Scans</span>
          </li>
          <li>
          <FontAwesomeIcon icon={faDoorOpen} color="black" className="fa-thin fa-door-open"/>
            <span onClick={LogOut}>Log Out</span>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderView;
