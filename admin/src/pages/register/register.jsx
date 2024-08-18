
// import React, { useState } from 'react';
// import './register.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [repassword, setRepassword] = useState('');
//     const [isAdmin, setIsAdmin] = useState(false); // State for admin checkbox
//     const [error, setError] = useState('');

//     const handleChange1 = (e) => setUsername(e.target.value);
//     const handleChange2 = (e) => setEmail(e.target.value);
//     const handleChange3 = (e) => setPassword(e.target.value);
//     const handleChange4 = (e) => setRepassword(e.target.value);
//     const handleAdminChange = (e) => setIsAdmin(e.target.checked); // Handle checkbox change

//     const handleClick = () => {
//         if (password.length < 8) {
//             setError('Password must be at least 8 characters long.');
//             return;
//         }

//         if (password !== repassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         setError(''); // Clear any previous errors
        
//         // Determine the role based on isAdmin state
//         const role = isAdmin ? 'admin' : 'user';

//         // Send the role to the backend
//         axios.post('http://localhost:5000/users/signup', { 
//             username, 
//             email, 
//             password, 
//             role // Pass the role instead of isAdmin
//         })
//         .then(response => {
//             navigate('/login'); // Navigate to login after successful registration
//         })
//         .catch(error => {
//             if (error.response) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred.");
//             }
//         });
//     };

//     return (
//         <div className='body'>
//             <div className='register-container'>
//                 <div className='register-form'>
//                     <h2>SIGN UP</h2>
//                     {error && <p className="error-message">{error}</p>}
//                     <label>Name
//                         <input 
//                             type='text' 
//                             placeholder='Enter your name' 
//                             value={username} 
//                             onChange={handleChange1} 
//                         />
//                     </label>
//                     <label>Email Id
//                         <input 
//                             type='email' 
//                             placeholder='Enter your email id' 
//                             value={email} 
//                             onChange={handleChange2} 
//                             required 
//                         />
//                     </label>
//                     <label>Password
//                         <input 
//                             type='password' 
//                             placeholder='Enter your password' 
//                             value={password} 
//                             onChange={handleChange3} 
//                             required 
//                         />
//                     </label>
//                     <label>Re-password
//                         <input 
//                             type='password' 
//                             placeholder='Re-enter your password' 
//                             value={repassword} 
//                             onChange={handleChange4} 
//                             required 
//                         />
//                     </label>
//                     <div>
//                         <label>
//                             <input 
//                                 type='checkbox' 
//                                 checked={isAdmin} 
//                                 onChange={handleAdminChange} 
//                             />
//                             Register as Admin
//                         </label>
//                     </div>
//                     <br />
//                     <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
//                         <p style={{ fontSize: '19px' }}>
//                             <em>Already have an account?</em>
//                         </p>
//                         <h4 
//                             style={{ color: 'brown', textDecoration: 'underline' }} 
//                             onClick={() => navigate('/login')}
//                         >
//                             LOGIN
//                         </h4>
//                     </div>
//                     <button onClick={handleClick}>Sign up</button>
//                     <br />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');

    const handleChange1 = (e) => setUsername(e.target.value);
    const handleChange2 = (e) => setEmail(e.target.value);
    const handleChange3 = (e) => setPassword(e.target.value);
    const handleChange4 = (e) => setRepassword(e.target.value);
    const handleAdminChange = (e) => setIsAdmin(e.target.checked);

    const handleClick = () => {
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (password !== repassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        const role = isAdmin ? 'admin' : 'user';

        axios.post('http://localhost:5000/users/signup', { 
            username, 
            email, 
            password, 
            role 
        })
        .then(response => {
            navigate('/login'); 
        })
        .catch(error => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.");
            }
        });
    };

    return (
        <div className='body'>
            <div className='register-container'>
                <div className='register-form'>
                    <h2>SIGN UP</h2>
                    {error && <p className="error-message">{error}</p>}
                    <label>Name
                        <input 
                            type='text' 
                            placeholder='Enter your name' 
                            value={username} 
                            onChange={handleChange1} 
                        />
                    </label>
                    <label>Email Id
                        <input 
                            type='email' 
                            placeholder='Enter your email id' 
                            value={email} 
                            onChange={handleChange2} 
                            required 
                        />
                    </label>
                    <label>Password
                        <input 
                            type='password' 
                            placeholder='Enter your password' 
                            value={password} 
                            onChange={handleChange3} 
                            required 
                        />
                    </label>
                    <label>Re-password
                        <input 
                            type='password' 
                            placeholder='Re-enter your password' 
                            value={repassword} 
                            onChange={handleChange4} 
                            required 
                        />
                    </label>
                    <div>
                        <label>
                            <input 
                                type='checkbox' 
                                checked={isAdmin} 
                                onChange={handleAdminChange} 
                            />
                            Register as Admin
                        </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
                        <p style={{ fontSize: '19px' }}>
                            <em>Already have an account?</em>
                        </p>
                        <h4 onClick={() => navigate('/login')}>LOGIN</h4>
                    </div>
                    <button onClick={handleClick}>Sign up</button>
                </div>
            </div>
        </div>
    );
};

export default Register;