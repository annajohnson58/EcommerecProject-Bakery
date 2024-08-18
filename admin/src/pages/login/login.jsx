
// import React, { useState } from 'react';
// import './login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error state

//     try {
//       const response = await axios.post('http://localhost:5000/users/signin', { email, password });
//       console.log('Login successful:', response.data);

//       // Store token in localStorage or state management (like Context API)
//       localStorage.setItem('token', response.data.token);

//       // Check user role to redirect accordingly (optional based on your flow)
//       if (response.data.role === 'admin') {
//         navigate('/dashboard'); // Redirect to admin dashboard
//       } else {
//         navigate('/home'); // Redirect to user dashboard
//       }
      
//     } catch (err) {
//       if (err.response) {
//         console.log('Server responded with:', err.response.data);
//         console.log('Response status:', err.response.status);
//         if (err.response.status === 403) {
//           setError('Access denied. You do not have permission to access this resource.');
//         } else if (err.response.status === 404) {
//           setError('Email not found. Please try again.');
//         } else {
//           setError(err.response.data.message || 'An error occurred during login.');
//         }
//       } else {
//         setError('Network error. Please try again later.');
//       }
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className='login-container'>
//       <div className='login-form'>
//         <h2>SIGN IN</h2>
//         {error && <p className='error-message'>{error}</p>}
//         <label>Email Id
//           <input type='email' placeholder='Enter your email id' onChange={handleChangeEmail} value={email} required />
//         </label>
//         <label>Password
//           <input type='password' placeholder='Enter your password' onChange={handleChangePassword} value={password} required />
//         </label>
//         <br />
//         <button onClick={handleSubmit}>Sign in</button>
//         <br />
//       </div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import './login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error state

//     try {
//       const response = await axios.post('http://localhost:5000/users/signin', { email, password });
//       console.log('Login successful:', response.data);

//       // Store token in localStorage or state management (like Context API)
//       localStorage.setItem('token', response.data.token);

//       // Check user role to redirect accordingly (optional based on your flow)
//       if (response.data.role === 'admin') {
//         navigate('/dashboard'); // Redirect to admin dashboard
//       } else {
//         window.location.href = 'http://localhost:3001/home'; // Redirect to user dashboard
//       }
      
//     } catch (err) {
//       if (err.response) {
//         console.log('Server responded with:', err.response.data);
//         console.log('Response status:', err.response.status);
//         if (err.response.status === 403) {
//           setError('Access denied. You do not have permission to access this resource.');
//         } else if (err.response.status === 404) {
//           setError('Email not found. Please try again.');
//         } else {
//           setError(err.response.data.message || 'An error occurred during login.');
//         }
//       } else {
//         setError('Network error. Please try again later.');
//       }
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className='login-container'>
//       <div className='login-form'>
//         <h2>SIGN IN</h2>
//         {error && <p className='error-message'>{error}</p>}
//         <label>Email Id
//           <input type='email' placeholder='Enter your email id' onChange={handleChangeEmail} value={email} required />
//         </label>
//         <label>Password
//           <input type='password' placeholder='Enter your password' onChange={handleChangePassword} value={password} required />
//         </label>
//         <button onClick={handleSubmit}>Sign in</button>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import './login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error state

//     try {
//       const response = await axios.post('http://localhost:5000/users/signin', { email, password });
//       console.log('Login successful:', response.data);

//       // Store token and user role in localStorage
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('userRole', response.data.role); // Store user role

//       if (response.data.role === 'admin') {
//         navigate('/dashboard'); // Redirect to admin dashboard
//       } else {
//         navigate('/home'); // Redirect to user dashboard
//       }
//     } catch (err) {
//       if (err.response) {
//         console.log('Server responded with:', err.response.data);
//         if (err.response.status === 403) {
//           setError('Access denied. You do not have permission to access this resource.');
//         } else if (err.response.status === 404) {
//           setError('Email not found. Please try again.');
//         } else {
//           setError(err.response.data.message || 'An error occurred during login.');
//         }
//       } else {
//         setError('Network error. Please try again later.');
//       }
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className='login-container'>
//       <div className='login-form'>
//         <h2>SIGN IN</h2>
//         {error && <p className='error-message'>{error}</p>}
//         <label>Email Id
//           <input type='email' placeholder='Enter your email id' onChange={handleChangeEmail} value={email} required />
//         </label>
//         <label>Password
//           <input type='password' placeholder='Enter your password' onChange={handleChangePassword} value={password} required />
//         </label>
//         <button onClick={handleSubmit}>Sign in</button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/usercontext'; // Import the UserContext
import './login.css'; // Import the CSS styles

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from context
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
            setError('Invalid email or password'); // Set error message
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