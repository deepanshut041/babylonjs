import { create } from "zustand";
import { BOARD, GAME_STATE, PLAYERS, solutions } from "./util";

// define the store
export const useStore = create((set: any, get: any) => ({
  board: BOARD,
  currentPlayer: PLAYERS.ONE,
  winner: null,
  gameState: GAME_STATE.PRE_GAME,
  startGame: () => {
    set({
      gameState: GAME_STATE.ACTIVE,
    });
  },
  resetGame: () => {
    set({
      board: BOARD,
      gameState: GAME_STATE.PRE_GAME,
      currentPlayer: PLAYERS.ONE,
      winner: null,
    });
  },
  updateGameState: (position: number) => {
    let currentPlayer = get().currentPlayer;
    let board = get().board;
    let gameState = get().gameState;
    let winner = get().winner;

    console.log(`Player ${currentPlayer} made a move at ${position}`);

    if (gameState !== GAME_STATE.ACTIVE) {
      return;
    }
    board = board.map((v: any, p: any) => (p === position ? currentPlayer : v));
    console.log(board.filter((v:any) => v == null).length)
    if (solutions(board)) {
      winner = currentPlayer;
      gameState = GAME_STATE.GAME_OVER;
      console.log(`Winner is ${winner}`);
    } else if (board.filter((v:any) => v == null).length == 0) {
      gameState = GAME_STATE.GAME_OVER;
      winner = null;
      console.log("Draw");
    }

    currentPlayer =
      currentPlayer === PLAYERS.ONE
        ? PLAYERS.TWO
        : (currentPlayer = PLAYERS.ONE);

    set({
      board: board,
      gameState: gameState,
      currentPlayer: currentPlayer,
      winner: winner,
    });
  },
}));
