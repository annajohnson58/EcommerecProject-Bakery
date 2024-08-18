
// import React from 'react';
// import './navbar.css';
// import navlogo from '../../assets/logo1.png';
// import navprofile from '../../assets/profile.png';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const navigate = useNavigate();
  
//     return (
//         <div className='navbar'>
//             <img  src={navlogo} className='nav-logo'/>
//             <img src={navprofile} onClick={() => navigate('/register')} className='nav-profile' alt="Profile" />  
//         </div>
//     );
// }

// export default Navbar;
import React, { useState, useEffect } from 'react';
import './navbar.css';
import navlogo from '../../assets/logo1.png';
import navprofile from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/usercontext'; // Use the UserContext

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser(); // Get user from context
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if user is admin based on context
        if (user === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user]); // Re-run effect when user changes

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setUser(null); // Clear user context
        navigate('/signin');
    };

    return (
        <div className='navbar'>
            <img src={navlogo} className='nav-logo' alt="Logo" />
            <div className='nav-profile-container'>
                <img 
                    src={navprofile} 
                    onClick={() => navigate('/register')} 
                    className='nav-profile' 
                    alt="Profile" 
                />
                {isAdmin && (
                    <button className='signout-button' onClick={handleLogout}>
                        Sign Out
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;