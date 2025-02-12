const User = require("../models/user.model");
const Booking = require("../models/BookingSchema");
const Doctor = require("../models/doctor.model");

exports.updateUser = async (req, res) => {
	const id = req.params.id;
	try {
		const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body },
			{ new: true }).select("-password")
			if (!updatedUser) {
				return res.status(404).json({ success: false, message: "User not found" });
			}

		res.status(200).json({ success: true, message: "Succesfully updated", data: updatedUser })
	} catch (error) {
		console.log("Error", error)
		res.status(500).json({ success: false, message: "failed to update ", error: error.message })
	}
}

exports.deleteUser = async (req,res) =>{
	const id = req.params.id;

	try{
		const deletedUser = await User.findByIdAndDelete(id
		);

		if (!deletedUser) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json({
			success : true,
			message : "User found",
			data  :deletedUser,
		})
	}catch(err){
		res.status(404).json({success : false,message :"failed to delete"})
	}
}
exports.getSingleUser = async (req,res) =>{
	const id = req.params.id;
	try{
		const user = await User.findById(id).select("-password");
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		res.status(200).json({
			success : true,
			message : "User found",
			data : user
		})
	}catch(err){
		res.status(404).json({success:false,message: "No user found"})
	}
}

exports.getAllUser = async (req,res) =>{
	
	try{
		const users = await User.find({}).select("-password");
		if (users.length === 0) {
			return res.status(404).json({ success: false, message: "No users found" });
		}
		res.status(200).json({
			success : true,
			message : "Users found",
			data : users
		})
	}catch(err){
		res.status(404).json({success:false,message: "Not found"})
	}
}
exports.getUserProfile = async (req,res) =>{
	const userId = req.userId;
	try{
		const user = await User.findById(userId).select('-password');
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		const {password, ...rest} = user._doc;
		res.status(200).json({
			success : true,
			message : "User found",
			data : {...rest}
		})
	}catch(err){
		res.status(500).json({success:false,message: "Something went wrong"})
	}
}

exports.getMyAppointments = async(req,res) =>{
	try{
		const bookings = await Booking.find({user:req.userId})

	const doctorIds = bookings.map((el) => el.doctor.id);

	const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password');

	res.status(200).json({
		success : true,
		message : "Appointments are getting",
		data : doctors
	})
	}catch(err){
		res.status(500).json({success:false,message: "Something went wrong"})
	}
}