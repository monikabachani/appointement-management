const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctorId: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String,
    },
    slotDuration: {
        type: Number,
        required: true
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
