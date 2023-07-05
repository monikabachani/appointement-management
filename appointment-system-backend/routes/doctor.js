const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const { body, validationResult } = require('express-validator');
const { createDoctor, getDoctor, getAllDoctor } = require('../contollers/doctorController');

//Create Doctor Availability Slots
router.post('/doctor/add-slots', [
  body('doctorId').not().trim().isEmpty().withMessage('Doctor ID is required and numeric.'),
  body('date').not().isEmpty().trim().withMessage('Availability Date is required'),
  body('startTime.hour').not().isEmpty().trim().withMessage('Start Time is required'),
  body('endTime.hour').not().isEmpty().trim().withMessage('End Time is required'),
  body('slotDuration').not().isEmpty().trim().withMessage('Slot Duration is required & needs to be in minutes'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: errors.array()[0].msg,
    });
  }
  createDoctor(req, res);
});

// Get doctor availability by doctor ID
router.get('/availability/:doctorId', async (req, res) => {
  getDoctor(req, res)
});
  
router.get('/all-doctors', async (req, res) => {
  getAllDoctor(req, res)
});
module.exports = router;
