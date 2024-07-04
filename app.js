const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewareLog = require('./middlewares/middleware');
const PartnerRoute = require('./routes/partnerRoutes');
const LoginRoute = require('./routes/loginRoutes');

const app = express();
app.use(cors());

const data_base = process.env.URL;
mongoose.connect(data_base, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch(error => {
        console.error('Connection error:', error.message);
    });

app.use(express.json());
app.use(middlewareLog);

app.use("/partners", PartnerRoute);
app.use("/login", LoginRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
