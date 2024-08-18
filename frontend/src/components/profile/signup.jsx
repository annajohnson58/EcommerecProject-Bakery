
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; 
import './signup.css';

const Register = () => {
    const { setUser } = useUser(); 
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState(''); // State for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        // Check password length
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        // Check if passwords match
        if (password !== rePassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser({
                    name: username, 
                    email: email, 
                    joinedDate: new Date().toISOString(), 
                });
                navigate('/signin'); 
            } else {
                setError(data.message); 
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("There was an error during registration.");
        }
    };

    return (
        <div className="register-container"> 
            <h2 className="register-heading">Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="form-input"
                    />
                    {error && password.length < 8 && (
                        <p className="error-message">{error}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Re-enter Password:</label>
                    <input 
                        type="password" 
                        value={rePassword} 
                        onChange={(e) => setRePassword(e.target.value)} 
                        required 
                        className="form-input"
                    />
                    {error && password !== rePassword && (
                        <p className="error-message">{error}</p>
                    )}
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            <p className="register-footer">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    );
};

export default Register;