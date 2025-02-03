const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    type: String, // Allows handling different formats (e.g., +1234567890)
  },
  photo: {
    type: String, // URL or file path
  },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], // Restricts to valid blood types
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("User", userSchema);
