


import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { FaSignOutAlt } from 'react-icons/fa'; 
import './profile.css'; 

const Profile = () => {
    const { user, logout, setUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleLogout = () => {
        logout(); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setUser({ ...user, ...formData }); 
        setIsEditing(false); 
    };

    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-card">
                    <div className="logout-container">
                        <FaSignOutAlt className="logout-icon" onClick={handleLogout} />
                        <span className="logout-text" onClick={handleLogout}>Logout</span>
                    </div>
                    <h1 className="profile-welcome">Welcome, {user.name}!</h1>
                    {isEditing ? (
                        <form className="edit-form" onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div className="profile-info">
                            <p><strong>Email:</strong> {user.email}</p>
                            
                            <button onClick={() => setIsEditing(true)}>Edit Details</button>
                        </div>
                    )}
                </div>
            ) : (
                <h1>Please log in.</h1> 
            )}
        </div>
    );
};

export default Profile;