const express = require("express");
const {getAllUser,getSingleUser,deleteUser,updateUser} = require("../controller/userController.js");

const {authenticate} = require('../auth/verifyToken.js');

const {restrict} = require('../auth/verifyToken.js')
const router = express.Router();
router.get('/:id',authenticate,restrict(['patient']),getSingleUser);
router.get('/',getAllUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports= router