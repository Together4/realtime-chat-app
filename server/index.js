const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

/**
 * Setting up the socket conncetion.
 * Establishes a connection with socket.io
 */
io.on("connection", (socket) => {
  console.log("We have a new Connection!!!");

  // listens for the join event from client
  // this also has acces to the data coming from the
  // 'join' event.
  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });

  // listens for individual connection on 'disconnect'
  socket.on("disconnect", () => {
    console.log("User has left!!!");
  });
});

app.use(cors());
app.use(router);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
