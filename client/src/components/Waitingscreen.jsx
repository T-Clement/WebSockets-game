import React, { useEffect } from 'react'
import { socket } from '../socket'





function Waitingscreen({ username }) {
  useEffect(() => {
    
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to the WebSocket server");
    });
    
    socket.emit("bonjour", username);
    

    socket.on("broadcast", (data) => {
      console.log(data);
    });

    socket.on("hello", (data) => {
      console.log("Message from server : ", data)
    });

    // socket.on("hello", (data) => {
    //   console.log("Message from server:", data);
    // });


    socket.on("getActiveUsers", (users) => {
      console.log("Active users ", users);
    });




    // cleanup functions
    return () => {
      socket.emit("disconnect", username);
      socket.disconnect();
      console.log(`${username} is disconnected`);
    }

  }, []);



  return (
    <div>
        <h1>Hello, { username  }</h1>
        <p>Ready to play ?</p>
        <p>Users ready to play :</p>
        <ul id="usersList">
        </ul>
    </div>
  )
}

export default Waitingscreen