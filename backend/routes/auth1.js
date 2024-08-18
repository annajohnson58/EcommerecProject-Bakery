
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
