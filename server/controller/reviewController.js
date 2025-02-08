const Review = require('../models/reviewSchema');
const Doctor = require('../models/doctor.model');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('doctor', 'name photo') // Populate doctor details
      .populate('user', 'name email'); // Populate user details

    res.status(200).json({ success: true, message: 'Successful', data: reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.createReview = async (req, res) => {
  try {
    console.log("Incoming Request:", req.body);
    console.log("Params Doctor ID:", req.params.doctorId);
    
    // Ensure doctor ID is taken from params if missing from body
    req.body.doctor = req.body.doctor || req.params.doctorId;
    req.body.user = req.userId; // Assign user ID from token

    console.log("Doctor ID after Fix:", req.body.doctor);
    console.log("User ID after Fix:", req.body.user);

    if (!req.body.doctor) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    // Check if the doctor exists
    const doctorExists = await Doctor.findById(req.body.doctor);
    if (!doctorExists) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Create review
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();

    // Add review to doctor's profile
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ success: true, message: "Review Submitted", data: savedReview });

  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
