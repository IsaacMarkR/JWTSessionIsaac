const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    next();
};

module.exports = verifyToken;