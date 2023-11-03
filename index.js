const Board = require("./src/board");

const board = new Board();
board.initializeBoard();

board.printBoard();
board.movePiece([1, 1], [2, 1]);
console.log();
board.printBoard();
