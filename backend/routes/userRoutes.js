
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const router = express.Router();
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.isAdmin = decoded.role === 'admin'; 
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


router.get('/', auth, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can access this resource.' });
    }
    
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});


router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body; 

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
            role: role || 'user', 
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});


router.put('/:id/block', auth, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can modify users.' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.blocked = !user.blocked; 
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
  
    
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      
      const { password: _, ...userWithoutPassword } = user._doc; 
      res.json({ token, ...userWithoutPassword });
    } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  });
  
router.get('/registrations-by-day', async (req, res) => {
    try {
        const registrations = await User.aggregate([
            {
                $match: { role: 'user' } 
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" }, 
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

        
        const result = new Array(7).fill(0);
                registrations.forEach(reg => {
                    result[reg.dayOfWeek - 1] = reg.count; 
                });
        
                res.json(result);
                console.log('registrations ',result) ;
    } catch (error) {
        console.error('Error fetching registrations by day:', error);
        res.status(500).json({ message: 'Error fetching registrations by day', error: error.message });
    }
});

router.get('/total-registrations', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' }); 
        res.json({ totalRegistrations: totalUsers });
    } catch (error) {
        console.error('Error fetching total registrations:', error);
        res.status(500).json({ message: 'Error fetching total registrations', error: error.message });
    }
});

module.exports = router;
