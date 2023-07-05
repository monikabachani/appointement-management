const moment = require("moment/moment");
const Doctor = require("../models/doctor");

const createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.insertMany(req.body);
        res.status(200).send({
            status: 200,
            message: "Doctor slots created succesfully",
            data: doctor
        });
    } catch (error) {
        console.error('Error inserting doctor slots:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;
    const { totalPages, page } = req.query;
    try {
        let skip = Number(totalPages) * Number(page) - totalPages;
        let matchQuery = {
            $match: {
                doctorId: Number(doctorId)
            }
        };
        let availabilities = await Doctor.aggregate([
            matchQuery,
            { $skip: skip },
            { $limit: Number(totalPages) }
        ]);


        let count = await Doctor.countDocuments([matchQuery])
        const grouped = availabilities.reduce((a,c)=>{
            const day = moment(c.date).format("ll")
            a[day] = a[day] || {date: moment(c.date).format("ll"), slots: []}
            a[day].slots.push(c)
            return a
        },{})   
        console.log("data",grouped);


        res.status(200).json({ availabilities, totalPages: count,grouped });
    } catch (error) {
        console.error('Error retrieving doctor availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllDoctor = async (req, res) => {
    try {
        const doctors = await Doctor.aggregate([
        { 
            $group : { 
                 _id : "$doctorId", 
            }
        }]);
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error retrieving doctors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    createDoctor,
    getDoctor,
    getAllDoctor
};
