import { useState } from 'react'

function Square({value, onSquareClick}){
  return <button className='square'onClick={onSquareClick}>{value}</button>
}

function App({xIsNext, squares, onPlay}) {

  function handleClick(i){
  if(squares[i] || calculateWinner(squares)) return ;

    const nextSquare = squares.slice();
    nextSquare[i] =(xIsNext) ? "X" : "O"
    // setSquares(nextSquare);
    // setXIsNext(!xIsNext)
    onPlay(nextSquare);
  }

  const winner = calculateWinner(squares);
  let status = " ";
  if (winner) {
    status ="winner : " + winner;
  } else {
    status ="next player : " + (xIsNext ? "X" : "O")
  }
  return (
    <>
      <div className='status'>
        {status}
      </div>
      <div className='box'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  // const xIsNext = currentMove % 2 === 0 ;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares= history[currentMove];

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0)
  }

  function handlePlay(nextSquare){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext)
  }

  const moves = history.map((squares, move) => {
    let description = "  ";
    if(move > 0 ){
      description ="Go to move # " + move;
    } else {
      description = "Go to game start"
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <div className='game'>
        <div className='app'> 
          <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className='game-info'>
          <ul>{moves}</ul>
        </div>
      </div>
    </>
  )
}

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let index = 0; index < lines.length; index++) {
  const [a,b,c] = lines[index];

  // if(squares[a] && squares[a] === squares[b] && squares[c]){
  //   return squares[a];
  //   } //bug

  if (squares[a] === squares[b] && squares[b] === squares[c]){
    return squares[a];
    }
  }
  return false;
}