// // routes/userRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');
// const router = express.Router();
// const jwt = require('jsonwebtoken');


// // Register a new user
// router.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Error registering user', error: error.message });
//     }
// });


// // Login a user
// // router.post('/signin', async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         // Find user by email
// //         const user = await User.findOne({ email });
// //         if (!user) {
// //             return res.status(404).json({ message: 'Email not found' });
// //         }

// //         // Check if user is blocked
// //         if (user.blocked) {
// //             return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
// //         }

// //         // Compare password
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(401).json({ message: 'Invalid password' });
// //         }

// //         // Create a JWT token
// //         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
// //         // Respond with the token and user details (excluding password)
// //         const { password: _, ...userWithoutPassword } = user._doc; 
// //         res.json({ token, ...userWithoutPassword });
// //     } catch (error) {
// //         console.error('Error during user login:', error);
// //         res.status(500).json({ message: 'Error during login', error: error.message });
// //     }
// // });
// // routes/userRoutes.js
// router.post('/signin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'Email not found' });
//         }

//         // Check if user is blocked
//         if (user.blocked) {
//             return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid password' });
//         }

//         // Increment login count
//         user.loginCount += 1;
//         await user.save(); // Save the updated user

//         // Create a JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
//         // Respond with the token and user details (excluding password)
//         const { password: _, ...userWithoutPassword } = user._doc; 
//         res.json({ token, ...userWithoutPassword });
//     } catch (error) {
//         console.error('Error during user login:', error);
//         res.status(500).json({ message: 'Error during login', error: error.message });
//     }
// });
// // routes/userRoutes.js
// router.get('/total-logins', async (req, res) => {
//     try {
//         const totalLogins = await User.aggregate([
//             { $match: { loginCount: { $gt: 0 } } },
//             { $count: "totalLogins" }
//         ]);

//         res.json({ totalLogins: totalLogins.length > 0 ? totalLogins[0].totalLogins : 0 });
//     } catch (error) {
//         console.error('Error fetching total logins:', error);
//         res.status(500).json({ message: 'Error fetching total logins', error: error.message });
//     }
// });
// // routes/userRoutes.js
// router.get('/registrations-by-day', async (req, res) => {
//     try {
//         const registrations = await User.aggregate([
//             {
//                 $group: {
//                     _id: { $dayOfWeek: "$createdAt" }, // Group by day of week (1 = Sunday, 2 = Monday, etc.)
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $project: {
//                     dayOfWeek: "$_id",
//                     count: 1,
//                     _id: 0
//                 }
//             }
//         ]);

//         // Create an array to hold counts for each day of the week (Sunday to Saturday)
//         const result = new Array(7).fill(0); // Initialize an array with 7 zeros
//         // registrations.forEach(reg => {
//         //     result[reg.dayOfWeek - 1] = reg.count; // Map counts to the correct day index
//         // });
//         registrations.forEach(reg => {
//             const date = new Date(reg.createdAt);
//             const day = date.getDay();
//             result[day]++;
//         });
//         res.json(result);

//         // res.json({
//         //     Sun: result[0],
//         //     Mon: result[1],
//         //     Tues: result[2],
//         //     Wed: result[3],
//         //     Thu: result[4],
//         //     Fri: result[5],
//         //     Sat: result[6],
//         // });
//     } catch (error) {
//         console.error('Error fetching registrations by day:', error);
//         res.status(500).json({ message: 'Error fetching registrations by day', error: error.message });
//     }
// });
// router.post('/registrations-by-day', (req, res) => {
//     result = req.body; 
//     console.log('Received registrations:', result);
//     res.status(200).send({ message: 'registrations received successfully' });
// });

// module.exports = router;
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');
// const router = express.Router();
// const jwt = require('jsonwebtoken');

// // Register a new user
// router.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Error registering user', error: error.message });
//     }
// });

// // Login a user
// router.post('/signin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'Email not found' });
//         }

//         // Check if user is blocked
//         if (user.blocked) {
//             return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid password' });
//         }

//         // Increment login count
//         user.loginCount += 1;
//         await user.save(); // Save the updated user

//         // Create a JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
//         // Respond with the token and user details (excluding password)
//         const { password: _, ...userWithoutPassword } = user._doc; 
//         res.json({ token, ...userWithoutPassword });
//     } catch (error) {
//         console.error('Error during user login:', error);
//         res.status(500).json({ message: 'Error during login', error: error.message });
//     }
// });

// // Get total user registrations by day of the week (Sunday to Saturday)
// router.get('/registrations-by-day', async (req, res) => {
//     try {
//         const registrations = await User.aggregate([
//             {
//                 $group: {
//                     _id: { $dayOfWeek: "$createdAt" }, // Group by day of week (1 = Sunday, 2 = Monday, etc.)
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $project: {
//                     dayOfWeek: "$_id",
//                     count: 1,
//                     _id: 0
//                 }
//             }
//         ]);

//         // Create an array to hold counts for each day of the week (Sunday to Saturday)
//         const result = new Array(7).fill(0); // Initialize an array with 7 zeros
//         registrations.forEach(reg => {
//             result[reg.dayOfWeek - 1] = reg.count; // Map counts to the correct day index
//         });

//         res.json(result);
//         console.log('registrations ',result) ;// Return the count array
//     } catch (error) {
//         console.error('Error fetching registrations by day:', error);
//         res.status(500).json({ message: 'Error fetching registrations by day', error: error.message });
//     }
// });

// // Example endpoint for total logins (if needed)
// router.get('/total-logins', async (req, res) => {
//     try {
//         const totalLogins = await User.aggregate([
//             { $match: { loginCount: { $gt: 0 } } },
//             { $count: "totalLogins" }
//         ]);

//         res.json({ totalLogins: totalLogins.length > 0 ? totalLogins[0].totalLogins : 0 });
//     } catch (error) {
//         console.error('Error fetching total logins:', error);
//         res.status(500).json({ message: 'Error fetching total logins', error: error.message });
//     }
// });

// module.exports = router;
// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Ensure you have a User model
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify token and role
const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.isAdmin = decoded.role === 'admin'; // Check if the user is an admin
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Get all users (for admins only)
// Get all users (for admins only)
router.get('/', auth, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can access this resource.' });
    }
    
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Register a new user (for both admins and regular users)
router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body; // Role can be provided by admin

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' if not provided
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Block/Unblock a user
router.put('/:id/block', auth, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can modify users.' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.blocked = !user.blocked; // Toggle blocked status
        await user.save();

        res.status(200).json({ message: `User has been ${user.blocked ? 'blocked' : 'unblocked'}.`, user });
    } catch (error) {
        console.error('Error blocking/unblocking user:', error);
        res.status(500).json({ message: 'Error blocking/unblocking user', error: error.message });
    }
});

// Delete a user
router.delete('/:id', auth, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can delete users.' });
    }

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Login a user
// Login a user
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      if (user.blocked) {
        return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Respond with the token and user details (excluding password)
      const { password: _, ...userWithoutPassword } = user._doc; 
      res.json({ token, ...userWithoutPassword });
    } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  });
  // Get user registrations by day of the week (Sunday to Saturday)
router.get('/registrations-by-day', async (req, res) => {
    try {
        const registrations = await User.aggregate([
            {
                $match: { role: 'user' } // Ensure we're only counting users
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" }, // Group by day of week (1 = Sunday, 2 = Monday, etc.)
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    dayOfWeek: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        // Create an array to hold counts for each day of the week (Sunday to Saturday)
        const result = new Array(7).fill(0); // Initialize an array with 7 zeros
                registrations.forEach(reg => {
                    result[reg.dayOfWeek - 1] = reg.count; // Map counts to the correct day index
                });
        
                res.json(result);
                console.log('registrations ',result) ;
    } catch (error) {
        console.error('Error fetching registrations by day:', error);
        res.status(500).json({ message: 'Error fetching registrations by day', error: error.message });
    }
});
// Get total registrations of role 'user'
router.get('/total-registrations', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' }); // Count documents with role 'user'
        res.json({ totalRegistrations: totalUsers });
    } catch (error) {
        console.error('Error fetching total registrations:', error);
        res.status(500).json({ message: 'Error fetching total registrations', error: error.message });
    }
});

module.exports = router;