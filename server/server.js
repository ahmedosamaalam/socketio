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

io.on("connection", (socket)=>{
  console.log('New User connected');

  socket.on('disconnect',()=>{

    console.log('Disconneted user');
  });


});

server.listen(port, ()=> {

  console.log("Server is running on port "+port);
});
