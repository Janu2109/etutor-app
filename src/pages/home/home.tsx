import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "../../components/Header/header";
import Features from "../../components/Feature/feature";
import About from "../../components/About/about";
import "./home.scss";
import aboutImage from "../../images/about.png";
import aboutImage1 from "../../images/download.png";
import Presentation from "../../components/Presentation/presentation";
import Login from "../../components/Login/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "../../components/Sign Up/sign";
import { ToastContainer } from "react-toastify";

function HomeView() {
  const navigate = useNavigate();

  const [view, setView] = useState<number>(1);

  return (
    <>
    <div id="homecontainer">
    
    {view === 1 ? (
      <>
        <Header view={view} setView={setView}/>
        <Features/>
        <About image={aboutImage} title='Never miss due dates again' button="Sign Up" setView={setView}/>
        <Presentation/>
        <About image={aboutImage1} title='Sign Up and Join Us Now' button="Sign Up" setView={setView}/>  
        </>
    ): view === 2 ? (
        <>
        <Login setView={setView}/>
        </>
    ): view === 3 ? (
          <SignUp setView={setView}/>
    ):(<></>)}
      
    </div>
    </>
  );
}

export default HomeView;
