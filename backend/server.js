const express = require('express');
const dotenv = require('dotenv');
const path = require('path')

const connectDB = require('./config/db')


const userRouter = require('./router/userRouter')
const chatRouter = require('./router/chatRouter')
const messageRouter = require('./router/messageRouter')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config();
connectDB()
const app = express();

app.use(express.json()) // to accept json data


app.use("/api/user",userRouter);
app.use("/api/chat",chatRouter);
app.use("/api/message",messageRouter);

app.use((req, res, next) => {
  console.log(`Processing route: ${req.method} ${req.path}`);
  next();
});

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}

// Middleware for error handling
app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
       origin: ["http://localhost:3000", "http://localhost:5173"],
        methods: ["GET", "POST"]
     }
    })

  io.on('connection', (socket) => {
    console.log("Connected to socket.io");
    socket.on('setup', (userData) => {
      socket.join(userData._id);
      console.log("User Joined: " + userData._id);
      socket.emit('connected');
    })
    socket.on('join chat', (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("new message",(newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
      if(!chat.users) return console.log("chat.users not defined");
      chat.users.forEach(user => {
        if(user._id == newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      })
    } )

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
  })