import React, { Dispatch, SetStateAction } from "react";
import Navbar from "../Navbar/navbar";

function Header({view, setView}:{view: number, setView: Dispatch<SetStateAction<number>>}){
    return (
        <div id="main">
            <Navbar view={view} setView={setView}/>
            <div className="name">
                <h1><span>Kick-Start Your Year</span> With Confidence and Creativity</h1>
                <p className="details">The E-Tutor web app aims to provide students with visual interaction as well as assistance when it comes to their academics and module selection. It also aims to provide insights for lecturers to make their sessions easier.</p>
                <a href="#" className="cv-btn" onClick={() => setView(3)}>Sign Up</a>
            </div>
        </div>
    )
}

export default Header;