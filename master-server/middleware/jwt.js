// const asyncHandler = require('express-async-handler');

// const validateToken = asyncHandler(async (req, res, next) => {
//     let token;
//     let authHeader = req.headers.authorization;
//     if (authHeader && authHeader.startsWith("Bearer")) {
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ message: "User is not authorized" });
//             }
//             req.user = decoded.user;
//             next();
//         });
//     } else {
//         res.status(401).json({ message: "Token is missing" });
//     }
// });

// module.exports = validateToken;


const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, user) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = authenticateUser;
