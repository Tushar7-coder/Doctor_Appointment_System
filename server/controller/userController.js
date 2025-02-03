const User = require("../models/user.model");
exports.updateUser = async (req, res) => {
	const id = req.params.id;
	try {
		const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body },
			{ new: true })
		res.status(200).json({ success: true, message: "Succesfully updated", data: updatedUser })
	} catch (error) {
		console.log("Error", error)
		res.status(500).json({ success: false, message: "failed to update ", data: updatedUser })
	}
}

exports.deleteUser = async (req,res) =>{
	const id = req.params.id;

	try{
		const deletedUser = await User.findByIdAndDelete(id,
		);
		res.status(200).json({
			success : true,
			message : "User found",
			data  :User,
		})
	}catch(err){
		res.status(404).json({success : false,message :"failed to update"})
	}
}
exports.getSingleUser = async (req,res) =>{
	const id = req.params.id;
	try{
		const user = await User.findById(id);
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
		const users = await User.find({});
		res.status(200).json({
			success : true,
			message : "Users found",
			data : users
		})
	}catch(err){
		res.status(404).json({success:false,message: "Not found"})
	}
}
