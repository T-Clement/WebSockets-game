const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173" // or port :5173  // port of React app
    } 
});


io.on("connection", (socket) => {
  console.log("New user connected");
  
  socket.on("bonjour", (username) => {
    console.log(`${username} dit bonjour au serveur WebScoket`);
    socket.emit("hello", `hello ${username} !`);
    console.log("Le serveur répond au bonjour de " + username)
  })



  socket.on("disconnect", (username) => {
    console.log(`${username} disconnect from the page`);
  })

});



const port = 4000;
httpServer.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
}); 