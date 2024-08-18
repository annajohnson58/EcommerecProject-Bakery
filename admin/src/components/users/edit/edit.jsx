import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './edit.css'

const EditUser = () => {
  
  const [user, setUser] = useState({ id: '', name: '', email: '' });
  const navigate=useNavigate();

   const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit =  (e) => {
    navigate('/users'); 
     };

  return (
    <div className='edit'>
      <div className="editm">
      <h1>Update User</h1>
      </div>
      <div className='form'>
      <form onSubmit={handleSubmit}>
        
          <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
       
        <button type="submit">Save</button>
      </form>
      
    </div>
    </div>
  );
};

export default EditUser;