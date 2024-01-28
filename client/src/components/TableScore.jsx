import React from 'react'

function TableScore({ ranking, setIsGameStarted }) {

  console.log(ranking);
  return (
    <div>
        <h2>The winner is : { ranking[0][0] }</h2>
        <ol>
          {ranking.map(user => (
            <li key={user[0]}>{user[0]} : {user[1]}</li>
          ))}
        </ol>

        <button onClick={ () => setIsGameStarted(false) }>Go back to Waiting Room</button>

    </div>
  )
}

export default TableScore