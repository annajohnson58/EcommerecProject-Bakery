
   
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
    
        const fetchUserDetails = async (token) => {
            try {
                const response = await fetch('http://localhost:5000/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
    
                const data = await response.json();
                setUser(data);
                console.log('Fetched User Data:', data); // Make sure this logs the user object with _id
            } catch (error) {
                console.error('Error fetching user details:', error);
                setUser(null); // Clear user state on error
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