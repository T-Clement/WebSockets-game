const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173" // or port :5173  // port of React app
    } 
});


const activeUsers = [];


io.on("connection", (socket) => {
  console.log("New user connected");
  
  socket.on("bonjour", (username) => {
    console.log(`${username} dit bonjour au serveur WebScoket`);
    socket.emit("hello", `hello ${username} !`);
    console.log("Le serveur répond au bonjour de " + username)


    // store in socket the username
    socket.username = username;

    // store user in active users list
    activeUsers[socket.id] = username;

    io.emit("getActiveUsers", Object.values(activeUsers));

  })



  socket.emit("broadcast", "Oui ça crie pour tout le monde");

  socket.on("disconnection", () => {
    console.log(`${socket.username} disconnect from the page`);
    delete activeUsers[socket.id];
    io.emit("getActiveUsers", Object.values(activeUsers));
  })

});


// io.emit("bor", )


const port = 4000;
httpServer.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
}); 