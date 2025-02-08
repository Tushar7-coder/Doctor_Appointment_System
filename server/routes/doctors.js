const express = require('express');
const {getAllDoctor,getSingleDoctor,deleteDoctor,updateDoctor} = require('../controller/doctorController');

const {authenticate,restrict} = require('../auth/verifyToken.js');

const reviewRouter = require('./review.js');
const router  = express.Router();

router.use('/:doctorId/reviews', reviewRouter);


router.get('/:id',getSingleDoctor);
router.get('/',getAllDoctor);
router.put('/:id',authenticate,restrict(['doctor']),updateDoctor);
router.delete('/:id',authenticate,restrict(['doctor']),deleteDoctor);

module.exports = router;