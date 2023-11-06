import Board from "./board.js";
import Game from "./game.js";
import BoardDisplay from "./boardDisplay.js";
import MessageDisplay from "./messageDisplay.js";

const root = document.getElementById("root");

const board = new Board();
board.initializeBoard();
const boardDisplay = new BoardDisplay(root, board);
const messageDisplay = new MessageDisplay(root);

const game = new Game(board, boardDisplay, messageDisplay, root);
game.startGame();
