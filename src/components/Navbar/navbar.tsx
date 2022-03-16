import React, {Dispatch, SetStateAction, useState} from "react";
import logo from "../../images/logo.png";


function Navbar({view, setView}:{view: number, setView: Dispatch<SetStateAction<number>>}){
    const [nav, setNav] = useState<boolean>(false);

   
    const changeBackground = () => {
        if(window.scrollY >= 50){
            setNav(true);
        }else{
            setNav(false);
        }
    }
    window.addEventListener('scroll', changeBackground);

    function HomeClicked(){
        document.getElementById("clicked-sign")?.classList.remove("active");
        document.getElementById("clicked-login")?.classList.remove("active");
        document.getElementById("clicked-home")?.classList.add("active");
        document.getElementById("clicked-faq")?.classList.remove("active");
        setView(1)
    }
    
    function SignUpClicked(){
        document.getElementById("clicked-sign")?.classList.add("active");
        document.getElementById("clicked-login")?.classList.remove("active");
        document.getElementById("clicked-home")?.classList.remove("active");
        document.getElementById("clicked-faq")?.classList.remove("active");
        setView(3);   
    }

    function LoginClicked(){
        document.getElementById("clicked-sign")?.classList.remove("active");
        document.getElementById("clicked-login")?.classList.add("active");
        document.getElementById("clicked-home")?.classList.remove("active");
        document.getElementById("clicked-faq")?.classList.remove("active");
        setView(2)
    }
    return (
        <>
    
        <nav className={nav ? 'nav active' : 'nav'}>
            <a href="#" className="logo">
                <img src={logo} alt=''/>
            </a>
            <input type='checkbox' className="menu-btn" id="menu-btn"/>
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="nav-icon">
                    
                </span>
            </label>
            <ul className="menu">
                <li onClick={() => HomeClicked()}><a id="clicked-home" href="#" className="active">Home</a></li>
                <li onClick={() => SignUpClicked()}><a id="clicked-sign" href="#">Sign Up</a></li>
                <li onClick={() => LoginClicked()}><a id="clicked-login" href="#">Login</a></li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar;