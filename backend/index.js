const User = require('./models/user.js')
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
app.use('/api',require('./routes/createGroup.js'))
app.use('/api',require('./routes/groupList.js'))


global.onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.usermId=userId;
    console.log('socket.usermId',socket.usermId)
  });

  console.log("user is ",onlineUsers)

 socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("sendUserSocket",sendUserSocket)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });


  socket.on("joinRoom", ({ id }) => {
    console.log("A user joined chatroom: " , id);
    socket.join(id);
  });

  socket.on("leaveRoom", ({ id }) => {
    socket.leave(id);
    console.log("A user left chatroom: " ,id);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
  socket.on("chatroomMessage", async ({ chatroomID, message }) => {
    if (message.trim().length > 0) {
       const usr = await User.findOne({ _id: socket.usermId });
      // const newMessage = new Message({
      //   chatroom: userId,
      //   user: socket.userId,
      //   message,
      // });
      console.log("chatroom id ",chatroomID)
      console.log("chatroom message ",message)
      console.log("chatroom socket ",socket.usermId)
      console.log("chatroom User Name ",usr)
       io.to(chatroomID).emit("newMessage", {
         message,
          name: usr.userName,
          usermId: socket.usermId,
       });
      // await newMessage.save();
    }
  });
});



// Listen on port 3000
server.listen(3001, () => {
  console.log('Server is running on port 3001');
  // Database Connection
  connectToMongo(); 
  });
  //this 