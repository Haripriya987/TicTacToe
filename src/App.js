import "./App.css";
import { useState, useEffect } from "react";
import Square from "./Components/Square";
import { Patterns } from "./Patterns";
import Header from './Header.js';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [gameCount, setGameCount] = useState(0); // New state variable to track game count
  const [playerOWins, setPlayerOWins] = useState(0); // Player O win count
  const [playerXWins, setPlayerXWins] = useState(0); // Player X win count


  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state != "none") {
      alert(`Game Finished! Winning Player: ${result.winner}`);
      setGameCount((prevCount) => prevCount + 1); // Increment game count
      restartGame();

    }
  }, [result]);

  /*useEffect(() => {
    if (result.state === "won") {
      setGameCount((prevCount) => prevCount + 1); // Increment game count
    }
  }, [result]);*/


  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx ===square && val ==="") {
          return player;
        }

        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });

        if (firstPlayer === "O") {
          setPlayerOWins((prevCount) => prevCount + 1);
        } else if (firstPlayer === "X") {
          setPlayerXWins((prevCount) => prevCount + 1);
        }
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      checkWin();
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
      setResult({ winner: "none", state: "none" });
  
  };

  return (
  <div className="main">
    <Header/>
    <div className="App">
      <div className="board">
        <div className="row">
        
          <Square
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0);
            }}
          />
          <Square
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1);
            }}
          />
          <Square
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2);
            }}
          />
        </div>
        <div className="row">
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </div>
        <div className="row">
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </div>
      </div>
    </div>

    {(result.state === "won"|| result.state==="tie") && (
        <button onClick={restartGame}>Start New Game</button>
      )}
      <p >Game Count: {gameCount}</p>
      <p>Player O Wins: {playerOWins}</p>
      <p>Player X Wins: {playerXWins}</p>

  </div>
  );
}

export default App;