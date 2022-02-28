import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  faBars,
  faBurger,
  faClose,
  faDoorOpen,
  faGears,
  faHome,
  faLock,
  faMessage,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  let list = document.querySelectorAll(".list");
  for (let i = 0; i < list.length; i++) {
    list[i].onclick = function () {
      let j = 0;
      while (j < list.length) {
        list[j++].className = "list";
      }
      list[i].className = "list active";
    };

    let menuToggle = document.querySelector(".toggle-admin-sidenav");
    let navigator  = document.querySelector(".admin-navigation");
    menuToggle.onclick = function (){
        console.log("Toggle Clicked");
      menuToggle.classList.toggle("active");
      navigator.classList.toggle("active");
      console.log("Class List", menuToggle.classList);
    };
  }

  return (
    <>
      <div className="admin-navigation">
        <ul>
          <li className="list active">
            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faHome} color="white" />
              </span>
              <span className="title">Home</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faUser} color="white" />
              </span>
              <span className="title">Profile</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faMessage} color="white" />
              </span>
              <span className="title">Messages</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faGears} color="white" />
              </span>
              <span className="title">Settings</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faQuestion} color="white" />
              </span>
              <span className="title">Help</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faLock} color="white" />
              </span>
              <span className="title">Password</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faDoorOpen} color="white" />
              </span>
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="toggle-admin-sidenav">
        <FontAwesomeIcon className="open" icon={faBars} color="white" />
        <FontAwesomeIcon className="close" icon={faClose} color="white" />
      </div>
    </>
  );
}

export default Sidebar;
