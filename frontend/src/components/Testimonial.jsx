
import React from "react";
import ProfilePic from "../Images/john-doe-image.png";
import ProfilePic1 from "../Images/AGNES.jpg";
import ProfilePic2 from "../Images/Jennifer.jpg";
import ProfilePic3 from "../Images/Jack.jpg";
import { AiFillStar } from "react-icons/ai";
import './Testimonial.css'

const Testimonial = () => {
  return (
    <div className="work-section-wrapper" >
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
        
        </p>
      </div>
      <div className="onebox" style={{display:"flex",flexDirection:"row"}}>
      <div className="testimonial-section-bottom">
         <img src={ProfilePic} alt="" /> 
        <p>
        Absolutely faboulous-we cant thank you enough-the cake was fingerlicking and tasted absolutely delicious!Follow them for artisinal delights and homemade treats..
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Sam</h2>

      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic1} alt="" />
        <p>
        Love their pies and toasties. We also had their doughnut, and it was yummy. Keep it up...
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Jennifer</h2>
        
      </div>
        
      {/* <div className="testimonial-section-bottom">
        <img src={ProfilePic2} alt="" />
        <p>
        Thank you so much for the beautiful cake-everyone loved it.I look forward to placing more orders with you in the future.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Agnes</h2>
        
      </div> */}

      <div className="testimonial-section-bottom">
        <img src={ProfilePic3} alt="" />
        <p>
        If you're craving some Western-style food, this is the place to do it. The pastries are quite good, the pizza is great, and the coffee hits the spot as well.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          
        </div>
        <h2>Jack</h2>
        
      </div>



       </div>






    </div>
  );
};

export default Testimonial;