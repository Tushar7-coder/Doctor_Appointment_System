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
    // Ensure doctor ID is provided
    if (!req.body.doctor) {
      req.body.doctor = req.params.doctorId;
    }

    // Ensure user ID is provided from authentication middleware
    if (!req.body.user) {
      req.body.user = req.userId;
    }

    // Validate doctor exists
    const doctorExists = await Doctor.findById(req.body.doctor);
    if (!doctorExists) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Create new review
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();

    // Add review ID to the doctor's review list
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ success: true, message: "Review Submitted", data: savedReview });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
