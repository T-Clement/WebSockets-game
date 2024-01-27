import { useState } from 'react'
import './App.css'
import { Login } from './components/Login';
import GameRoom from './components/GameRoom';

function App() {
  const [username, setUsername] = useState(null);




  return username ? (
    <GameRoom username = { username } setUsername = { setUsername } />
  ) 
  : 
  (
    <Login onSubmit ={ setUsername } />
  );
  
}

export default App
