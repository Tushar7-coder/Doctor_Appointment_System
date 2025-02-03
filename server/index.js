const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser'); //middleware to parse cookies
const cors = require('cors'); //middleware to handle cross origin resource sharing to connect frontend backend 
const authRoute = require('./routes/auth.js');

const userRoute = require('./routes/users.js')
const doctorRoute = require('./routes/doctors.js');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); //parse incommimg json requests

app.use(cookieParser()); //parse cookies in incoming HTTP requests 

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true })); // CORS configuration with credentials like cokies and authentication 
// Routes

app.use('/api/v1/auth', authRoute); 
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);

// Database Connection
mongoose.set('strictQuery', false); //Disables strict query filtering (to avoid deprecation warnings in MongoDB v7+).


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      // useNewUrlParser: true, // Ensures compatibility with MongoDB’s new connection string parser.
      // useUnifiedTopology: true, // Uses MongoDB's unified topology layer for better handling of connections.
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error in connecting DB:', error);
    process.exit(1); // Stop the server if DB connection fails
  }
};

// Root Route
app.get('/', (req, res) => {
  res.send('Hello, welcome to the API');
});

// Start Server Only After DB Connection
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Graceful Shutdown (optional but recommended)
//Listens for the SIGINT signal (sent when you stop the server using Ctrl + C).
//Closes the MongoDB connection properly before exiting the app.


process.on('SIGINT', () => {
  console.log('SIGINT received: closing HTTP server');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

startServer();
