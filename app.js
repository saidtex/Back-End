const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewareLog = require('./middlewares/middleware');

const PartnerRoute = require('./routes/partnerRoutes')
const LoginRoute = require('./routes/loginRoutes')

const app = express();
app.use(cors());

const data_base = process.env.URL;
mongoose.connect(data_base)
    .then(()=>{
        console.log('Successfully connected');
    })
    .catch(error=>{
        console.log('Connection error', error);
    })

app.use(express.json());

app.use(middlewareLog);

app.use("/partners",PartnerRoute);
app.use("/login",LoginRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
