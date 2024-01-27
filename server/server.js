const { createServer } = require("http");
const { Server } = require("socket.io");
const { uuid } = require("uuid");
const { randomIntFromInterval } = require('./utilities');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173" // or port :5173  // port of React app
    } 
});

// TODOS :
// choose a room to play to display 
  // only users related to this room
// change the socket.id system to something send by client ?

const activeUsers = {};


io.on("connection", (socket) => {
  console.log("New user connected to websocket");
  
  socket.on("bonjour", (username) => {
    console.log(`${username} dit bonjour au serveur WebScoket`);
    socket.emit("hello", `hello ${username} !`);
    console.log("Le serveur répond au bonjour de " + username)

    // store user in active users list
    // socket
    activeUsers[socket.id] = { 
      id : socket.id, 
      username: username
    }; // socket.id return a unique identifier synch between client and server side

    console.log(activeUsers);
    io.emit("getActiveUsers", activeUsers);


    
  })

  socket.on("launch_game", (username) => {
    console.log(`${username} launched the game`);
    let randomRoundNumber = randomIntFromInterval(0, 15);
    console.log("Round targeted number is " + randomRoundNumber);
    io.emit("launch_round", randomRoundNumber); // send to every player the 
  });



  socket.on("disconnect", () => {
    console.log(`${socket.id} (${activeUsers[socket.id].username}) disconnect from the page`);
    delete activeUsers[socket.id];
    console.log("Nouvelle liste des utilisateurs connectés : ");
    console.log(activeUsers);
    io.emit("getActiveUsers", activeUsers);
  })

});






// ---------------------------------------------------
// ---------------------------------------------------
const port = 4000;
httpServer.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
}); 