import React, { Dispatch, SetStateAction } from "react";
import Navbar from "../Navbar/navbar";

function Header(){
    return (
        <div id="main">
            <Navbar />
            <div className="name">
                <h1><span>Kick-Start Your Year</span> With Confidence and Creativity</h1>
                <p className="details">The E-Tutor web app aims to provide students with visual interaction as well as assistance when it comes to their academics and module selection. It also aims to provide insights for lecturers to make their sessions easier.</p>
                <a href="#" className="cv-btn">Sign Up</a>
            </div>
        </div>
    )
}

export default Header;