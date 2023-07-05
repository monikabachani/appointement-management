const Appointement = require("../models/appointement");

const createAppointment = async (req, res) => {
    try {
        const appointementData = await Appointement.insertMany(req.body);
        res.status(200).json(appointementData);
      } catch (error) {
        console.error('Error creating appointments', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {
    createAppointment
};
