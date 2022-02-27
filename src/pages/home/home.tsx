import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "../../components/Header/header";
import Features from "../../components/Feature/feature";
import About from "../../components/About/about";
import "./home.css";
import aboutImage from "../../images/about.png";
import aboutImage1 from "../../images/download.png";
import Presentation from "../../components/Presentation/presentation";
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function HomeView() {
  const navigate = useNavigate();

  return (
    <>
    <Header/>
      <Features/>
      <About image={aboutImage} title='Never miss due dates again' button="Sign Up"/>
      <Presentation/>
      <About image={aboutImage1} title='Sign Up and Join Us Now' button="Sign Up"/>  
    </>
  );
}

export default HomeView;
