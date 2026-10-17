
   
    import React, { createContext, useContext, useState, useEffect } from 'react';
    

    const UserContext = createContext();
    
    export const UserProvider = ({ children }) => {
        const [user, setUser] = useState(null);
       
    
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                fetchUserDetails(token);
            }
        }, []);
    
        const API_URL = process.env.REACT_APP_API_URL || 'https://ecommerecproject-bakery.onrender.com';

const fetchUserDetails = async (token) => {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
            // token expired or invalid: treat as logged out
            localStorage.removeItem('token');
            setUser(null);
            return;
        }
        if (!response.ok) throw new Error('Failed to fetch user details');

        const data = await response.json();
        setUser(data);
    } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null);
    }
};
        const logout = () => {
                    setUser(null);
                    localStorage.removeItem('token');
                };
            
        

    
        return (
            <UserContext.Provider value={{ user,setUser,logout }}>
                {children}
            </UserContext.Provider>
        );
    };
    
    export const useUser = () => {
        return useContext(UserContext);
    };
