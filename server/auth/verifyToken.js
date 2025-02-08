const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
        console.log("No token found or incorrect format"); // 🔍 Debug
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const token = authToken.split(' ')[1];
        console.log("Received Token:", token); // 🔍 Debug

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", decoded); // 🔍 Debug

        if (!decoded.userId) {  // ✅ Make sure we're using 'userId'
            console.log("Token missing userId"); // 🔍 Debug
            return res.status(401).json({ success: false, message: "Invalid token structure" });
        }

        req.userId = decoded.userId; // ✅ Fixing 'userId'
        req.role = decoded.role;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token is expired" });
        }
        console.error("JWT Authentication Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
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
