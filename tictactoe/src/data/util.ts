export enum PLAYERS {
  ONE,
  TWO,
}

export enum GAME_STATE {
  PRE_GAME,
  ACTIVE,
  PAUSED,
  MENU,
  GAME_OVER,
  POST_GAME,
}

export const BOARD: PLAYERS[] = new Array(9).fill(null);

export const INITIAL_PLAYER = PLAYERS.ONE;

export const solutions = (board: any): boolean => {
  return (
    false ||
    (board[6] != null && board[6] === board[7] && board[6] === board[8]) ||
    (board[3] != null && board[3] === board[4] && board[3] === board[5]) ||
    (board[0] != null && board[0] === board[1] && board[0] === board[2]) ||
    (board[6] != null && board[6] === board[3] && board[6] === board[0]) ||
    (board[7] != null && board[7] === board[4] && board[7] === board[1]) ||
    (board[8] != null && board[8] === board[5] && board[8] === board[2]) ||
    (board[6] != null && board[6] === board[4] && board[6] === board[2]) ||
    (board[8] != null && board[8] === board[4] && board[8] === board[0])
  );
};

// export const pcMove = (board: any) => {
//   let testBoard;
//   // try to finish, then try to block opponent
//   for (var p = 0; p < 2; p++) {
//     for (var i = 1; i < 10; i++) {
//       if (board[i] !== null) {
//         continue;
//       }
//       testBoard = Object.assign({}, board);
//       testBoard[i] = p;
//       if (solutions(testBoard)) {
//         return i;
//       }
//     }
//   }

//   // guess any other free field
//   let guess = undefined;
//   while (guess === undefined || board[guess] !== null) {
//     guess = Math.floor(Math.random() * 10 + 1).toString();
//   }
//   return guess;
// };
