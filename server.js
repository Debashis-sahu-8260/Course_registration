const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/courseDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema for the course registration
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
});

// Create a model based on the schema
const Registration = mongoose.model('Registration', registrationSchema);

// Serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission
app.post('/register', async (req, res) => {
    try {
        const newRegistration = new Registration({
            name: req.body.name,
            email: req.body.email,
            course: req.body.course,
        });

        console.log('Received Registration Data:', req.body);

        await newRegistration.save();
        
        console.log('Data saved successfully');
        res.json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.json({ success: false, message: 'Error saving data.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
