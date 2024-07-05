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
app.use(cors());
app.use(express.json());

// Async function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
    // Exit the process if unable to connect to MongoDB
    process.exit(1);
  }
};

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectToDatabase();
    // Start listening once connected
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
    // Exit the process if there's an error starting the server
    process.exit(1);
  }
};

// Call the function to start server and connect to MongoDB
startServer();

// Middleware for logging
app.use(middlewareLog);

// Routes
app.use("/partners", PartnerRoute);
app.use("/login", LoginRoute);

module.exports = app;
