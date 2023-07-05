const express = require('express');
const router = express.Router();
const { createAppointment } = require('../contollers/appointmentController');

// create appointments
router.post('/appointment/add', async (req, res) => {
  createAppointment(req, res);
});

module.exports = router;
