import React, { useEffect } from 'react'
import { socket } from '../socket'





function Waitingscreen({ username }) {
  useEffect(() => {
    // websocket connection
    // socket.on("connect", () => {
    //   console.log(`${username} is connected`);
    // });

    // socket.on("message", (data) => {
    //   console.log("Message from server: ", data)
    // })

    // console.log("Dans le useEffect")
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to the WebSocket server");
    });
    socket.emit("bonjour", username);
    

    socket.on("hello", (data) => {
      console.log("Message from server : ", data)
    })

    // socket.on("hello", (data) => {
    //   console.log("Message from server:", data);
    // });



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
        <ul id="usersList"></ul>
    </div>
  )
}

export default Waitingscreen