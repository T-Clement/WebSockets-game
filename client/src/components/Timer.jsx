import React, { useEffect, useState } from 'react'

const chronoStyle = {
    padding: "16px",
    border: "2px solid white",
  
};


function Timer({ sendUserNumberToServer, userId }) {
    // STATES
    const [chronoValue, setChronoValue] = useState(20);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const id = setInterval(() => {
            setChronoValue(prev => prev - 0.1);
        }, 100);
        setIntervalId(id);

        return () => clearInterval(id);
    }, []);
    
    // HANDLINGS
    
    const handleStop = () => {
        clearInterval(intervalId);
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