const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Initialize Socket.io with the HTTP server

//serve static files (HTML)
app.use(express.static("public"));

//Socket.io connection event, event mean when a user connects
io.on("connection",(socket)=>{
    console.log("A user connected");
    socket.on("chat message",(msg)=>{//listen for chat message event from client
        io.emit("chat message",msg); //broadcast the message to all connected clients
    });
    //listen for disconnection event
    socket.on("disconnection",()=>{
        console.log("A user disconnected");
    });
});

server.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
});