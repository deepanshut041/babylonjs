import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TicTacToeScene } from "./scenes/TicTacToeScene";
import reportWebVitals from "./reportWebVitals";
import { useStore } from "./data/store";
import { GAME_STATE, PLAYERS } from "./data/util";

const PreGame = () => {
  const startGame = useStore((state) => state.startGame);
  return (
    <button
      style={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        backgroundColor: "green",
        padding: "1rem 2rem",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      }}
      onClick={startGame}
    >
      Start Game
    </button>
  );
};

const GameOver = () => {
  const winner = useStore((state) => state.winner);
  const resetGame = useStore((state) => state.resetGame);

  return (
    <div className="game-controller" style={{ textAlign: "center" }}>
      {winner == null ? (
        <h1 color="red">
          Game Draw
        </h1>
      ) : (
        <h1 color="red">
          Game Winner: {PLAYERS.ONE === winner ? "First" : "Second"} Player
        </h1>
      )}

      <button
        style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          backgroundColor: "blue",
          padding: "1rem 2rem",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

function App() {
  const gameState = useStore((state) => state.gameState);
  return (
    <div className="App">
      {gameState == GAME_STATE.ACTIVE ? (
        <TicTacToeScene />
      ) : gameState == GAME_STATE.GAME_OVER ? (
        <GameOver />
      ) : gameState == GAME_STATE.PRE_GAME ? (
        <PreGame />
      ) : null}
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
