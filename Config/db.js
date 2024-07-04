const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.DATABASE_URL
mongoose.connect(URL)
    .then(()=>{
        console.log('Successfully connected');
    })
    .catch(error=>{
        console.log('Connection error', error);
    })