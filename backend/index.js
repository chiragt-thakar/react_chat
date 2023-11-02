const express = require('express')
const app = express()
const http = require('http');
const socketIo = require('socket.io')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const server = http.createServer(app);
// const io = socketIo(server);
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
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
app.use('/api',require('./routes/userlist.js'))
app.use('/api',require('./routes/addMessage.js'))
app.use('/api',require('./routes/getMessage.js'))


global.onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  console.log("user is ",onlineUsers)

 socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("sendUserSocket",sendUserSocket)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});



// Listen on port 3000
server.listen(3001, () => {
  console.log('Server is running on port 3001');
  // Database Connection
  connectToMongo(); 
  });
  //this 