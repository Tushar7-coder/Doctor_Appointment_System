const express = require("express");
const {getAllUser,getSingleUser,deleteUser,updateUser} = require("../controller/userController.js");

const router = express.Router();
router.get('/:id',getSingleUser);
router.get('/',getAllUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports= router