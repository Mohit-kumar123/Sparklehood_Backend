const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const incidentRoutes = require('./routes/incidentRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/incident', incidentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Corrected the typo here
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
