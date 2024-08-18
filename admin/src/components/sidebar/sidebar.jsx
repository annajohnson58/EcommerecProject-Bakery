
import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import dashboard_icon from '../../assets/dashboard.png';
import product_icon from '../../assets/product.png';
import order_icon from '../../assets/order.png';
import user_icon from '../../assets/user.png';
import navlogo from '../../assets/logo1.png';
import { FaBars } from 'react-icons/fa'; 
const Sidebar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true); 

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible); 
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
