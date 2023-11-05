const Game = require("./src/game");
const Board = require("./src/board");

const board = new Board();
board.initializeBoard();

const game = new Game(board);
game.play();
