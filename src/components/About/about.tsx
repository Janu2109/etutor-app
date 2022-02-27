function About({image, title, button}:{image: string, title: string, button: string}) {
  return (
    <div id="about">
      <div className="about-image">
          <img src={image} alt=''/>
      </div>
      <div className="about-text">
          <h2> {title} </h2>
          <p>One of the benefits of using this web-application is that it is accessible from anywhere, from any device. It also displays notifications on your personal dashboard.</p>
          <button> {button} </button>
      </div>
    </div>
  );
}

export default About;
