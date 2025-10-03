'use client'
import { useState } from 'react';

function Square({value, onSquareClick}) {

  return (
    <button onClick={onSquareClick} className="square w-20 h-20 border-2 border-gray-500 flex items-center justify-center text-3xl font-bold hover:bg-gray-200 transition">
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i){
    if (squares[i] || checkTheWinner(squares)){
      return
    }

    const next = squares.slice()
    if (xIsNext) {
      next[i] = "X"
    } else {
      next[i] = "O"
    }
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  const winner = checkTheWinner(squares)
  let status
  if (winner){
    status = "winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="status">{status}</div>
      <div className="flex gap-2">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex gap-2">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex gap-2">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function checkTheWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i]
    if (squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a]
    }    
  }
  return null;
}