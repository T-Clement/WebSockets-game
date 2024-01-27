import React, { useEffect, useState } from 'react'
import { socket } from '../socket'


function GameRoom({ username, setUsername }) {
  const [usersActive, setUsersActive] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [roundRandomNumber, setRoundRandomNumber] = useState(null);

  useEffect(() => {
    
    socket.connect();
    socket.on("connect", () => {
      // console.log("Connected to the WebSocket server with id : " + socket.id);
    });
    
    socket.emit("bonjour", username);
    

    
    socket.on("getActiveUsers", (users) => {
      setUsersActive(users);

    });

    socket.on("launch_round", (data) => {
      setRoundRandomNumber(data);
      setIsGameStarted(true);
      // console.log("Le nombre cible pour ce round est : " + data);
    })

    


    // reconnect user if connection lost and user still in page
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

  }, [username]); // end of useEffect

  const handleClick = () => {
    // console.log(`${username} a lancé la partie`);
    // launchGame(username);
    socket.emit("launch_game", username); // send id of user instead of user name
    // console.log("Après l'envoi de la partie");
  };



  // console.log(usersActive);
  // console.log(Object.values(usersActive));
  // console.log(Object.values(usersActive).length);

   return !isGameStarted ? (
    <div>
        <h1>Hello, { username  }</h1>
        <p>Ready to play ?</p>
        <p>Users ready to play (2 players minimum) : {Object.values(usersActive).length}</p>
        <ul id="usersList">
          {Object.values(usersActive).map((user) => (
            <li key={user.id}>{user.username} {user.id === socket.id ? "(You)" : ""}</li>
          ))}
        </ul>

        <button 
          onClick = {handleClick} 
          disabled = {Object.values(usersActive).length < 2}

        >
          Lancer la partie
        </button>

    </div>
  ) 
  :  (
    <>
      <h1>Lancement de la partie</h1>
      <p>Targeted Number : { roundRandomNumber }</p>
    </>
  )
}

export default GameRoom