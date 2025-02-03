const express = require('express');
const {getAllDoctor,getSingleDoctor,deleteDoctor,updateDoctor} = require('../controller/doctorController');

const router  = express.Router();
router.get('/:id',getSingleDoctor);
router.get('/',getAllDoctor);
router.put('/:id',updateDoctor);
router.delete('/:id',deleteDoctor);

module.exports = router;