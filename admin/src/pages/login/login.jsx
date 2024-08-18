




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/usercontext'; 
import './login.css'; 

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/users/signin', { email, password });
            console.log('Login successful:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            setUser(response.data.role);

            if (response.data.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            setError('Invalid email or password'); 
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2>SIGN IN</h2>
                {error && <p className='error-message'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className='input-label'>
                        Email Id
                        <input type='email' placeholder='Enter your email id' onChange={handleChangeEmail} value={email} required />
                    </label>
                    <label className='input-label'>
                        Password
                        <input type='password' placeholder='Enter your password' onChange={handleChangePassword} value={password} required />
                    </label>
                    <button type='submit' className='submit-button'>Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
