const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true, // Improves search performance
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String, 
  },
  ticketPrice: {
    type: Number,
    default: 0, 
  },
  role: {
    type: String,
    enum: ["doctor", "admin"], 
    default: "doctor",
  },
  specialization: {
    type: String,
  },
  qualification: [
    {
      degree: String,
      institution: String,
      year: Number,
    },
  ],
  experience: [
    {
      hospital: String,
      position: String,
      years: Number,
    },
  ],
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: [
    {
      day: String, 
      slots: [String],
    },
  ],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

module.exports = mongoose.model("Doctor", DoctorSchema);

