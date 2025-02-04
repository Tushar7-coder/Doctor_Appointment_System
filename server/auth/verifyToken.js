const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');
//const express = require('express');

const authenticate = async (req, res, next) => {
    //console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);

    const authToken = req.headers.authorization;
    //console.log("Received Auth Header:", authToken); // Debugging log

    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const token = authToken.split(' ')[1];
        //console.log("Extracted Token:", token); // Debugging log

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log("Decoded Token:", decoded); // Debugging log

        req.userId = decoded.id;
        req.role = decoded.role;
        
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message : "Token is expired"})
        }
        console.error("JWT Authentication Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};


const restrict = (roles) => async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
        }

        // Fetch user from either Patient or Doctor collection
        let user = await User.findById(userId) || await Doctor.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if user's role is authorized
        if (!roles.includes(user.role)) {
            return res.status(403).json({ success: false, message: "You are not authorized" });
        }

        next(); // Move to next middleware

    } catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



module.exports = {authenticate,restrict};
