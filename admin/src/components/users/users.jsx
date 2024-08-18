
import React, { useState, useEffect } from 'react';
import './users.css';
import { FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa';

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();

                console.log('Fetched users:', data);

                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Expected an array but received:', data);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
            try {
                const response = await fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Error deleting user');
                }

                const data = await response.json();
                console.log(data.message);

                // Update local state to remove the deleted user
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleBlockUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${id}/block`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error blocking/unblocking user');
            }
    
            const updatedUser = await response.json();
            // Update local state with the modified user
            setUsers(users.map(user => user._id === updatedUser.user._id ? updatedUser.user : user));
        } catch (error) {
            console.error('Error blocking/unblocking user:', error);
            alert(error.message);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter users based on the search term
    const filteredUsers = users.filter((user) => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mainuser">
            <h1>Users</h1>
            <div className="top">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{width:'400px' }}
                />
            </div>
            <div className="section">
                <table style={{ width: '100%', background: 'white' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <FaTrash
                                        style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleDelete(user._id)}
                                    />
                                    {user.blocked ? (
                                        <button style={{backgroundColor:'white',color:'green',width:'80px'}} onClick={() => handleBlockUser(user._id)}>
                                            <FaCheckCircle style={{ color: 'green' }} /> Unblock
                                        </button>
                                    ) : (
                                        <button style={{backgroundColor:'white', color:'red',width:'80px'}} onClick={() => handleBlockUser(user._id)}>
                                            <FaBan style={{ color: 'orange' }} /> Block
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;