const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const middlewareLog = require('./middlewares/middleware');
const PartnerRoute = require('./routes/partnerRoutes');
const LoginRoute = require('./routes/loginRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(middlewareLog); // Custom middleware for logging

// MongoDB Connection
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch(error => {
    console.error('Connection error:', error.message);
});

// Routes
app.use("/partners", PartnerRoute); // Example route for partners
app.use("/login", LoginRoute); // Example route for login

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
