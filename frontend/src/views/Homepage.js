import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import video from "../assets/video.mp4"; // Assuming the video file is in the same directory as your component
import "../css/Homepage.css";

const Home = () => {
  useEffect(() => {
    document.title = "Password Generator"; // Set the title
  }, []);

  return (
    <>
      <div className="Background">
        <video autoPlay muted loop id="bg-video" className="fullscreen-video">
          <source src={video} type="video/mp4" />
        </video>
        
        <h1 className="title">Welcome to our Password Generator Application!</h1> {/* Title */}
        <div className="description">
          <h2><div className="h2"> This application allows you to generate strong and secure passwords for your accounts. You can also associate passwords with different applications for easy management</div>  </h2>
        </div>
      </div>
    </>
  );
};

export default Home;
