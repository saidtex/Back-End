const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const middlewareLog = require('./middlewares/middleware');
const PartnerRoute = require('./routes/partnerRoutes');
const LoginRoute = require('./routes/loginRoutes');

const app = express();
app.use(cors());

mongoose.connect(process.env.URL)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

app.use(express.json());

app.use(middlewareLog);

app.use("/blogs",BlogRoute);
app.use("/login",LoginRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
