const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
    let authToken = req.headers.authorization;

    if (!authToken) {
        console.log("No token found in request headers");
        return res.status(401).json({ success: false, message: "Authorization token is required" });
    }

    if (!authToken.startsWith('Bearer ')) {
        console.log("Invalid token format");
        return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    try {
        const token = authToken.split(' ')[1];
        console.log("Received Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", decoded);

        if (!decoded.userId) {
            console.log("Token missing userId");
            return res.status(401).json({ success: false, message: "Invalid token structure" });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;

        next();
    } catch (error) {
        console.error("JWT Authentication Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};




const restrict = (roles) => async (req, res, next) => {
    try {
        console.log("Checking user authorization..."); // 🔍 Debug
        console.log("req.userId:", req.userId); // 🔍 Debug

        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
        }

        // Fetch user from either User or Doctor collection
        let user = await User.findById(req.userId) || await Doctor.findById(req.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found in database" });
        }

        console.log("User Role:", user.role);
        console.log("Allowed Roles:", roles);

        if (!roles.includes(user.role)) {
            console.error("Authorization error: User role not authorized");
            return res.status(403).json({ success: false, message: "You are not authorized" });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = { authenticate, restrict };
