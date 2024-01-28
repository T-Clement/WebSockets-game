import React, { useEffect, useState } from 'react'

const chronoStyle = {
    padding: "16px",
    border: "2px solid white",
  
};


function Timer({ sendUserNumberToServer, userId }) {
    // STATES
    const [chronoValue, setChronoValue] = useState(20);
    
    // needed to target the interval when we want to stop
        // the countdown when the user clicked
    const [intervalId, setIntervalId] = useState(null); 

    useEffect(() => {
        const id = setInterval(() => {
            // update value of chrono
            setChronoValue(prev => prev - 0.1);
        }, 100);
        setIntervalId(id);

        // cleanup function
        return () => clearInterval(id);
    }, []);
    
    // HANDLINGS
    
    const handleStop = () => {
        clearInterval(intervalId);
        // send user number to websocket server
        sendUserNumberToServer( { chronoValue : chronoValue, userId : userId });
    }

      // VIEW
  return (
    <div>
        <p style={ chronoStyle }> { chronoValue.toFixed(3) } </p>
        <button onClick={ handleStop }>STOP</button>
    </div>
  )
}

export default Timer