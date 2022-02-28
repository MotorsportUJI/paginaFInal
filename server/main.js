var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

const { Client } = require("pg")

const connectionData = {
  user: 'ujimotorsport',
  host: 'pi@raspberrypi.local',
  database: 'innit.sql',
  port: 5432,
}

const client = new Client(connectionData)

client.connect()
client.query('SELECT * FROM p2').then(response => {
  console.log(response.rows)
  client.end()
})

//var messages = [
//  {
//    id: 1,
//    text: "Hola soy un mensaje",
//    author: "Mohamed Al Howaidi",
//  },
//];

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!");
});

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", messages);

  socket.on("new-message", function (data) {
    messages.push(data);

    io.sockets.emit("messages", messages);
  });
});

server.listen(3000, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});
