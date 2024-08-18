// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1]; // Extract the token

//     if (!token) {
//         return res.status(403).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         req.Admin = verified;
//          // Attach the user information to the request object
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid token' });
//     }
// };

// module.exports = auth;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth1 = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Expecting format "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.userId; // Save user ID for later use
        next();
    });
};

module.exports = auth1;