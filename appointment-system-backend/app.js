const express = require('express');
const mongoose = require('mongoose');
const app = express();
const availabilityRoutes = require('./routes/appointment');
const doctorRoutes = require('./routes/doctor');
const cors = require('cors');
const bodyParser = require('body-parser');


// Set up routes and middleware here

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/appointment_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(availabilityRoutes);
app.use(doctorRoutes);

const port = 3000; // or any other port number you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
