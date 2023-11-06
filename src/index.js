import Board from "./board.js";
import Game from "./game.js";

const board = new Board();
board.initializeBoard();

const game = new Game(board);

const root = document.getElementById("root");

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "my-canvas");
canvas.setAttribute("height", 648);
canvas.setAttribute("width", 640);

const ctx = canvas.getContext("2d");
root.appendChild(canvas);

const boardDisplay = document.createElement("div");
boardDisplay.setAttribute("id", "chess-board");

let count = 0;
const x = [];

const gamePlayFunc = (loc) => {
  if (count === 0) {
    if (board.atLocation(loc) === null) return;
    count += 1;
    x.push(loc);
  } else {
    const startPos = x.pop();
    if (board.movePiece(startPos, loc)) {
      renderBoard();
    }
    console.log(board.isInCheckmate("black"));
    count -= 1;
  }
};

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const button = document.createElement("button");

    button.setAttribute("id", "board-tile");
    button.pos = [i, j];
    button.addEventListener("click", () => gamePlayFunc(button.pos));
    boardDisplay.appendChild(button);
  }
}

const renderBoard = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle =
        (i + j) % 2 === 1 ? "rgb(184,139,74)" : "rgb(227,193,111)";
      ctx.fillRect(i * 80, j * 81, 80, 81);

      const loc = board.atLocation([i, j]);
      if (loc !== null) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 80 * j, 81 * i, 80, 81);
        };
        img.src = `./../src/${loc.imgRep()}.svg`;
      }
    }
  }
};

renderBoard();

root.appendChild(boardDisplay);
