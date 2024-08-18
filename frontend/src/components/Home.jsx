

import React from "react";
import About from "./About";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import BannerImage from "../Images/items.webp";

import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

import './home.css'; 

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="home-container">
       
        <div className="home-banner-container">
          <div className="home-text-section">
            <h1 className="primary-heading">
              Your Favourite Food Delivered Cakey & Fluffy
            </h1>
            <p className="primary-text">
              Healthy switcher chefs do all the prep work, like filtering, battering, baking
              & garnishing, so you can enjoy them wholeheartedly.
            </p>
            <button className="secondary-button" onClick={() => navigate('/product')}>
              Order Now <FiArrowRight />
            </button>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="Delicious Food" className="banner-image" />
          </div>
        </div>
        <Testimonial />
        <Work />
        <About />
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default Home;