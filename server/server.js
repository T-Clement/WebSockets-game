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
const scores = {};

io.on("connection", (socket) => {
  // log in server consoles
  console.log("New user connected to websocket");
  
  // put new connected user in activeUsers object
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


    
  }); // end of "bonjour"


  // get the name of user who launch the game
  socket.on("launch_game", (username) => {
    console.log(`${username} launched the game`);

    // get a server side generated random number
    let randomRoundNumber = randomIntFromInterval(0, 15);
    console.log("Round targeted number is " + randomRoundNumber);

    // broadcast to all users the random number and launch round
    io.emit("launch_round", randomRoundNumber);
  });



  socket.on("sendUserNumberToServer", (data) => {
    console.log(activeUsers[data["userId"]] + " : " + data["chronoValue"]);
    scores[data["userId"]] = data["chronoValue"];
    console.log(scores);

    if(Object.values(scores). length === Object.values(activeUsers).length) {
      
    }
  });


  // handle disconnection of user by remove it from activeUsers object
  socket.on("disconnect", () => {
    console.log(`${socket.id} (${activeUsers[socket.id].username}) disconnect from the page`);

    // delete disconnected user by targeted him by its id
    delete activeUsers[socket.id];
    console.log("Nouvelle liste des utilisateurs connectés : ");
    

    console.log(activeUsers);
    // send updated activeUsers object to client
    io.emit("getActiveUsers", activeUsers);
  })

});






// ---------------------------------------------------
// ---------------------------------------------------
const port = 4000;
httpServer.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
}); 