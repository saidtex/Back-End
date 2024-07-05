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

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
    
    // Start listening once connected
    app.listen(port, () => {
      console.log(Server is running on port ${port});
    });
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
  });

// Middleware for logging
app.use(middlewareLog);

// Routes
app.use("/partners", PartnerRoute);
app.use("/login", LoginRoute);

module.exports = app; use async await with my connection
