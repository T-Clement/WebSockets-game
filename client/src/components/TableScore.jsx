import React, { useEffect, useState } from 'react'

function TableScore({ ranking, setIsGameStarted }) {
  const [timer, setTimer] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    if(timer === 0) {
      setIsGameStarted(false);
      // reset all values in server who are not related to TableScore ? 

    }
    return () => {
      clearInterval(interval);
    }
  }, [timer]);


  console.log(ranking);
  return (
    <div>
        <h2>The winner is : { ranking[0][0] }</h2>
        <ol>
          {ranking.map(user => (
            <li key={user[0]}>{user[0]} : {user[1]}</li>
          ))}
        </ol>

        <button disabled onClick={ () => setIsGameStarted(false) }>Redirection to Waiting Room : {timer} </button>

    </div>
  )
}

export default TableScore