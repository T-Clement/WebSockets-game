import { useState } from 'react'
import './App.css'
import { Login } from './components/Login';
import Waitingscreen from './components/Waitingscreen';

function App() {
  const [username, setUsername] = useState(null);




  return username ? (
    <Waitingscreen username = { username }/>
  ) 
  : 
  (
    <Login onSubmit ={ setUsername } />
  );
  
}

export default App
