const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');
const express = require('express');

const authenticate = async(req,res,next) =>{
	const authToken = req.headers.authorization;

	if(!authToken || !authToken.startsWith('Bearer ')){
		return res.status(401).json({success : false,message : "No token, authozation denied"})
	}
	try{
		//console.log(authToken);
		const token = authToken.split(' ')[1];
		const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
		req.userId=decoded.id 
		req.role = decoded.role

		next();

	}catch(error){
		if(error.name === 'TokenExpiredError'){
			return res.status(401).json()
		}
	}
}


module.exports = authenticate;
