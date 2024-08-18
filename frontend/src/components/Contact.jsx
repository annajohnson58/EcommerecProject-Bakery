

import React, { useState } from "react";

const Contact = () => {
  
  const [email, setEmail] = useState("");

  
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("Submitted Email: ", email);
    
   
    setEmail("");
  };

  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Questions In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <form className="contact-form-container" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="yourmail@gmail.com" 
          value={email} 
          onChange={handleChange} 
          required 
        />
        <button 
          type="submit" 
          style={{ backgroundColor: "#8D493A" }} 
          className="secondary-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
