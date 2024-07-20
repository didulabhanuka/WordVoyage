const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
dotenv.config();

//routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

//connect db
connectDB();

//middleware
app.use(express.json());
app.use(bodyParser.json());

//route middlewares
app.use(`/wordvoyage/user`, userRoutes)
app.use(`/wordvoyage/posts`, postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server started on port ${PORT}...`));