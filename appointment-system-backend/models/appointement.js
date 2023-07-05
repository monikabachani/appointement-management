const mongoose = require('mongoose');

const appointementSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        ref: 'Doctor'
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    }
});

const Appointement = mongoose.model('Appointement', appointementSchema);

module.exports = Appointement;
