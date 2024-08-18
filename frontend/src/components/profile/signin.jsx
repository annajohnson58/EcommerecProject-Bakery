
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import './signin.css';
import {  FaTimes } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from '../../context/UserContext';

const Login = () => {
    const { setUser } = useUser(); // Get setUser from context
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5000/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                const { token, ...userData } = data;
                localStorage.setItem('token', token); // Store the token
                setUser(userData); // Set user context
                console.log('Logged in User Data:', userData);
                navigate('/home'); // Redirect after login
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userData = {
                email: user.email,
                displayName: user.displayName,
            };
            localStorage.setItem('token', user.accessToken);
            setUser(userData); // Set user context
            navigate('/home'); // Navigate after successful Google sign-in
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            setError('Google sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div className="login-container"> 
            <div className="close-icon" onClick={handleClose} style={{ cursor: 'pointer', fontSize: '24px', color: 'black', marginTop: '0', marginBottom: '90px', marginLeft: '300px' }}>
                <FaTimes />
            </div>
            <h2 className="login-heading" style={{ marginBottom: '50px' }}>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
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
                </div>
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
            <p className="or-text">OR</p>
            <div className="google-signin-container">
                <button onClick={handleGoogleSignIn} className="google-button" disabled={loading}>
                    <FcGoogle  className="google-icon" />
                    {loading ? 'Loading...' : 'Sign in with Google'}
                </button>
                <p className="login-footer">
                    New User? <Link to="/signup">Sign up</Link>
                </p>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;