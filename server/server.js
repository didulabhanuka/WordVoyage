const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
dotenv.config();

//connect db
connectDB();

//middleware
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server started on port ${PORT}...`));