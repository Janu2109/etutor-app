import { Dispatch, SetStateAction } from "react";

function About({image, title, button, setView}:{image: string, title: string, button: string, setView: Dispatch<SetStateAction<number>>}) {
  return (
    <div id="about">
      <div className="about-image">
          <img src={image} alt=''/>
      </div>
      <div className="about-text">
          <h2> {title} </h2>
          <p>One of the benefits of using this web-application is that it is accessible from anywhere, from any device. It also displays notifications on your personal dashboard.</p>
          <button onClick={() => setView(3)}> {button} </button>
      </div>
    </div>
  );
}

export default About;
