import Board from "./board.js";
import Game from "./game.js";
import BoardDisplay from "./display/boardDisplay.js";
import MessageDisplay from "./display/messageDisplay.js";
import ImagesLoader from "./display/imagesLoader.js";

const root = document.getElementById("root");

const main = async () => {
  const imagesLoader = new ImagesLoader();
  const messageDisplay = new MessageDisplay(root);
  messageDisplay.setMessage("Loading...");

  const images = await Promise.all(imagesLoader.loadImages());

  const board = new Board();
  board.initializeBoard();
  const boardDisplay = new BoardDisplay(root, board, images);

  const game = new Game(board, boardDisplay, messageDisplay, root);
  game.startGame();
};

main();
