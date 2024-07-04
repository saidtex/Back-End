const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const middlewareLog = require('./middlewares/middleware');
const PartnerRoute = require('./routes/partnerRoutes');
const LoginRoute = require('./routes/loginRoutes');

require("./Config/db");

const app = express();

app.use(cors); 

app.use(express.json());
app.use(middlewareLog);

app.use("/partners", PartnerRoute);
app.use("/login", LoginRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
