var express = require("express");
var socketIO = require("socket.io");
var http = require("http");
var path = require ("path");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,"../client");
app.use(express.static(publicPath));

//connection special
io.on("connection", (socket)=>{
  console.log('New User connected');

//message send server to client
  // io.emit('newMessage', {
  //   success: true,
  //   message: {
  //       name : 'osama',
  //       email:'asd@gmail.com'}
  // });

  socket.on('createMessage',function (userMessageData) {
    console.log('Message from  user',userMessageData);
    io.emit('newMessage',{
      success: userMessageData.success,
      message:userMessageData.message
    });
  });

//disconnection special
  socket.on('disconnect',function(){
    console.log('Disconneted user');
  });


});

server.listen(port, function() {

  console.log("Server is running on port "+port);
});
