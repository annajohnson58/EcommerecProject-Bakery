// // routes/adminRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const Admin = require('../models/Admin');
// const router = express.Router();
// const jwt = require('jsonwebtoken');

// // Register a new admin
// router.post('/', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Check if the admin already exists
//         const existingAdmin = await Admin.findOne({ email });
//         if (existingAdmin) {
//             return res.status(400).json({ message: 'Admin already exists' });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newAdmin = new Admin({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newAdmin.save();
//         res.status(201).json({ message: 'Admin registered successfully', adminId: newAdmin._id });
//     } catch (error) {
//         console.error('Error registering admin:', error);
//         res.status(500).json({ message: 'Error registering admin', error: error.message });
//     }
// });


// // Login an admin
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(404).json({ message: 'Email not found' });
//         }

//         if (admin.blocked) {
//             return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
//         }

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid password' });
//         }

//         // Create a JWT token
//         const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
//         // Respond with the token and admin details (excluding password)
//         const { password: _, ...adminWithoutPassword } = admin._doc;
//         res.json({ ...adminWithoutPassword, token });
//     } catch (error) {
//         console.error('Error during admin login:', error);
//         res.status(500).json({ message: 'Error during login', error: error.message });
//     }
// });

// module.exports = router;
// routes/adminRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

// Middleware to verify admin token
const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Get all admins
router.get('/', auth, async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Error fetching admins', error: error.message });
    }
});

// Register a new admin
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully', adminId: newAdmin._id });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Error registering admin', error: error.message });
    }
});

// Block/Unblock an admin
router.put('/:id/block', auth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        admin.blocked = !admin.blocked; // Toggle blocked status
        await admin.save();

        res.status(200).json({ message: `Admin has been ${admin.blocked ? 'blocked' : 'unblocked'}.`, admin });
    } catch (error) {
        console.error('Error blocking/unblocking admin:', error);
        res.status(500).json({ message: 'Error blocking/unblocking admin', error: error.message });
    }
});

// Delete an admin
router.delete('/:id', auth, async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully', admin });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Error deleting admin', error: error.message });
    }
});
// Login an admin
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Email not found' });
        }

        if (admin.blocked) {
            return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create a JWT token
        const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Respond with the token and admin details (excluding password)
        const { password: _, ...adminWithoutPassword } = admin._doc;
        res.json({ ...adminWithoutPassword, token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

module.exports = router;
