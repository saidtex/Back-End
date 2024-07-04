const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const url = process.env.URL;
const port = process.env.PORT;

const middlewareLog = require('./middlewares/middleware');

const PartnerRoute = require('./routes/partnerRoutes')
const LoginRoute = require('./routes/loginRoutes')


const app = express();
app.use(cors());

mongoose.connect(url,{
  useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000, // Increased timeout value
    socketTimeoutMS: 60000,         // Increased timeout value
    poolSize: 10,                   // Connection pool size
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500,         // Reconnect every 500ms
  }).then(() => {
    console.log('MongoDB is connected');
  }).catch((error) => {
    console.error(`MongoDB connection unsuccessful (attempt ${++connectionAttempts}), retrying in 5 seconds...`, error);
    if (connectionAttempts < maxRetries) {
      setTimeout(connectWithRetry, 5000);
    } else {
      console.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  });
};
connectWithRetry();
app.use(express.json());

app.use(middlewareLog);

app.use("/partners",PartnerRoute);
app.use("/login",LoginRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
