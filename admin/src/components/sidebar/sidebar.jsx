// import React from 'react'
// import './sidebar.css'
// import {Link} from 'react-router-dom'
// import dashboard_icon from '../../assets/dashboard.png'
// import product_icon from '../../assets/product.png'
// import order_icon from '../../assets/order.png'
// import { useNavigate } from 'react-router-dom'
// import user_icon from '../../assets/user.png'
// import Navbar from '../navbar/navbar'
// import navlogo from '../../assets/logo.jpg';

//  const Sidebar = () => {
//     const navigate=useNavigate();
//   return (
//     <>
  
//     <div className='sidebar'>
//     <img src={navlogo} alt="Logo" className='nav-logo' />     
// <Link to={'/dashboard'} style={{textDecoration:"none"}}>
// <div className="sidebar-item">
//     <img src={dashboard_icon} alt="" style={{width:"30px",height:"30px"}}/>
//     <p>Dashboard</p>
// </div>

// </Link>
// <Link to={'/orders'} style={{textDecoration:"none"}}>
// <div className="sidebar-item">
//     <img src={order_icon} alt=""  style={{width:"50px",height:"50px"}}  />
//     <p>Orders</p>
// </div>

// </Link>
// <Link to={'/product'} style={{textDecoration:"none"}}>
// <div className="sidebar-item">
//     <img src={product_icon} alt=""  style={{width:"50px",height:"50px"}}  />
//     <p>Products</p>
// </div>

// </Link>

// <Link to={'/users'} style={{textDecoration:"none"}}>
// <div className="sidebar-item">
//     <img src={user_icon} alt=""  style={{width:"50px",height:"50px"}}  />
//     <p>Users</p>
// </div></Link>

//     </div>
//     </>
//   )
// }
// export default Sidebar;
import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import dashboard_icon from '../../assets/dashboard.png';
import product_icon from '../../assets/product.png';
import order_icon from '../../assets/order.png';
import user_icon from '../../assets/user.png';
import navlogo from '../../assets/logo1.png';
import { FaBars } from 'react-icons/fa'; // Importing a hamburger icon

const Sidebar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true); // State to manage sidebar visibility

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible); // Toggle visibility
    };

    return (
        <>
            <div className="menu-bar" onClick={toggleSidebar}>
                <FaBars size={24} color="#333" />
            </div>
            <div className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
                <img src={navlogo} alt="Logo" className='logo' />
                <Link to={'/dashboard'} style={{ textDecoration: "none" }}>
                    <div className="sidebar-item">
                        <img src={dashboard_icon} alt="Dashboard" />
                        <p>Dashboard</p>
                    </div>
                </Link>
                <Link to={'/orders'} style={{ textDecoration: "none" }}>
                    <div className="sidebar-item">
                        <img src={order_icon} alt="Orders" />
                        <p>Orders</p>
                    </div>
                </Link>
                <Link to={'/product'} style={{ textDecoration: "none" }}>
                    <div className="sidebar-item">
                        <img src={product_icon} alt="Products" />
                        <p>Products</p>
                    </div>
                </Link>
                <Link to={'/users'} style={{ textDecoration: "none" }}>
                    <div className="sidebar-item">
                        <img src={user_icon} alt="Users" />
                        <p>Users</p>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;