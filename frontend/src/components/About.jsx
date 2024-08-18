import React from "react";

import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (<>
     
       <div className="about-section-text-container" style={{marginTop:'40px'}}>
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Bread feeds the body,indeed,but flowers feed also the soul
        </h1>
        <p className="primary-text">
          Indulge in our wide selection of cakes,cookies,and savory snacks crafted with love and care
        </p>
       
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
        </div>
      
    
    </>
  );
};

export default About;