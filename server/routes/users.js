const express = require("express");
const {getAllUser,getSingleUser,deleteUser,updateUser,getUserProfile,getMyAppointments} = require("../controller/userController.js");

const {authenticate} = require('../auth/verifyToken.js');

const {restrict} = require('../auth/verifyToken.js')
const router = express.Router();

router.get('/:id',authenticate,restrict(['patient']),getSingleUser);
router.get('/',authenticate,restrict(['admin']),getAllUser);
router.put('/:id',authenticate,restrict(['patient']),updateUser);
router.delete('/:id',authenticate,restrict(['patient']),deleteUser);
router.get('/profile/me',authenticate,restrict(['patient']),getUserProfile);
router.get('/appointments/my-appointments',authenticate,restrict(['patient']),getMyAppointments);

module.exports= router
