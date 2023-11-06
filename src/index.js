import Board from "./board.js";
import Game from "./game.js";
import BoardDisplay from "./boardDisplay.js";

const root = document.getElementById("root");

const board = new Board();
board.initializeBoard();

const boardDisplay = new BoardDisplay(root, board);

const game = new Game(board, boardDisplay, root);
game.startGame();
