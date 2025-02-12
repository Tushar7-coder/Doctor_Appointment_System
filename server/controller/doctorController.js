const Doctor = require("../models/doctor.model");
const Booking = require("../models/BookingSchema");
// Update Doctor
exports.updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to update", error: error.message });
  }
};

// Delete Doctor
exports.deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
      data: deletedDoctor,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete doctor", error: error.message });
  }
};

// Get Single Doctor
exports.getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id).populate('reviews').select('-password');

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve doctor", error: error.message });
  }
};

// Get All Doctors
exports.getAllDoctor = async (req, res) => {
  try {

	const {query} = req.query;
	let doctors;
	if(query){
		doctors = await Doctor.find({isApproved : 'approved',
			$or:[
				{name : {$regex : query,$options : 'i'}},
				{specialization : {$regex : query,$options : 'i'}}
			]

		}).select('-password')
	}else{
		 doctors = await Doctor.find({isApproved : 'approved'}).select('')
	}
    

    if (!doctors.length) {
      return res.status(404).json({ success: false, message: "No doctors found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctors retrieved successfully",
      data: doctors,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve doctors", error: error.message });
  }
};

exports.getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try{
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    const {password, ...rest} = doctor._doc;
    const appointments = await Booking.find({doctor:doctorId})
    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: {...rest, appointments},
    });
  }catch(err){
    res.status(500).json({success:false,message: "Something went wrong"})
  }
}