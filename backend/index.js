var express = require('express')
const cookieParser = require('cookie-parser');
var cors = require('cors')
var app = express()

const connectToMongo = require('./db/db.js')
//const registration = require('./routes/registration.js')
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3000/login'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and other credentials to be included
};

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());


app.use('/api',require('./routes/registration.js'))
app.use('/api',require('./routes/login.js'))
app.use('/api',require('./routes/home.js'))
app.use('/api',require('./routes/logout.js'))

// Listen on port 3000
app.listen(3001, () => {
  console.log('Server is running on port 3001');
  // Database Connection
  connectToMongo(); 
  });