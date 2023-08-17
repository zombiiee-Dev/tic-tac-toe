import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [step, setStep] = useState(null);

  const [histories, setHistories] = useState([
    {
      squares,
      title: "Go to game start",
      xIsNext,
    },
  ]);

  //Declaring a Winner
  useEffect(() => {
    // exclicit
    const newWinner = calculateWinner(squares);
    console.log("OUTPUT ~ useEffect ~ newWinner:", newWinner);
    setWinner(newWinner);
  }, [squares]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    // if there is a win player, stop
    if (winner) return;
    const newSquare = xIsNext ? "X" : "O";

    const newXIsNext = !xIsNext;
    setXIsNext(newXIsNext);

    const newSquares = [
      ...squares.slice(0, i),
      newSquare,
      ...squares.slice(i + 1),
    ];
    setSquares(newSquares);

    // handle history

    let nextStep = histories.length;
    let previousHistories = histories;

    if (step) {
      nextStep = step + 1;
      previousHistories = [...histories.slice(0, step + 1)];
    }

    const newHistory = {
      squares: newSquares,
      title: `Go to move #${nextStep}`,
      xIsNext: newXIsNext,
    };

    setStep(null);
    setHistories([...previousHistories, newHistory]);
  };

  //Restart game
  const handlRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setStep(null);
    setHistories([
      {
        squares: Array(9).fill(null),
        title: "Go to game start",
        xIsNext: true,
      },
    ]);
  };

  const handleClickHistory = (i) => {
    setStep(i);
    setSquares(histories[i].squares);
    setXIsNext(histories[i].xIsNext);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
        <History
          histories={histories}
          handleClickHistory={handleClickHistory}
        />
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
