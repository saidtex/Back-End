const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.URL;
const port = process.env.PORT;

const middlewareLog = require('./middlewares/middleware');
const PartnerRoute = require('./routes/partnerRoutes');
const LoginRoute = require('./routes/loginRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'https://saidtex.ma'
}));
app.use(cors());
app.use(express.json());
app.use(middlewareLog); // Logging middleware

// Routes
app.use("/partners", PartnerRoute);
app.use("/login", LoginRoute);

// Function to start the server
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to database");

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit with failure
  }
}

// Start the server
startServer();

module.exports = app;

