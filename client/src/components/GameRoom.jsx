import React, { useEffect, useState } from 'react'
import { socket } from '../socket'


function GameRoom({ username, setUsername }) {
  const [usersActive, setUsersActive] = useState([]);
  useEffect(() => {
    
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to the WebSocket server with id : " + socket.id);
    });
    
    socket.emit("bonjour", username);
    

    socket.on("broadcast", (data) => {
      console.log(data);
    });

    // socket.on("hello", (data) => {
    //   console.log("Message from server : ", data)
    // });

    // socket.on("hello", (data) => {
    //   console.log("Message from server:", data);
    // });


    socket.on("getActiveUsers", (users) => {
      setUsersActive(users);

      // console.log("Active users ", usersActive); // answer empty array ??
    });


    socket.on("connect_error", () => {
      // socket.emit("connection_error", socket.id);
      // socket.disconnect();
      // setUsername(null);
      setTimeout(() => {
        socket.connect();
      }, 1000);
    })

    // cleanup functions
    return () => {
      // socket.emit("disconnection", socket.id);
      socket.disconnect();
      // console.log(`${username} is disconnected`);
      setUsername(null);
    }

  }, [username]);

  console.log(usersActive);

  return (
    <div>
        <h1>Hello, { username  }</h1>
        <p>Ready to play ?</p>
        <p>Users ready to play : {Object.values(usersActive).length}</p>
        <ul id="usersList">
          {Object.values(usersActive).map((user) => (
            <li key={user.id}>{user.username} {user.id === socket.id ? "(You)" : ""}</li>
          ))}
        </ul>
    </div>
  )
}

export default GameRoom