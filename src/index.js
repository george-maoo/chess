const Board = require("./board");
const Game = require("./game");
const Pawn = require("./pieces/pawn");
const King = require("./pieces/king");
const Queen = require("./pieces/queen");
const Knight = require("./pieces/knight");
const Rook = require("./pieces/rook");
const Bishop = require("./pieces/bishop");

const board = new Board();
board.initializeBoard();
console.log(board);

const root = document.getElementById("root");

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "my-canvas");
canvas.setAttribute("height", 648);
canvas.setAttribute("width", 640);

const ctx = canvas.getContext("2d");
root.appendChild(canvas);

const boardDisplay = document.createElement("div");
boardDisplay.setAttribute("id", "chess-board");

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const button = document.createElement("button");

    const atLoc = board.atLocation([i, j]);
    if (atLoc instanceof Pawn) {
      button.textContent = "P";
    } else if (atLoc instanceof King) {
      button.textContent = "K";
    } else if (atLoc instanceof Knight) {
      button.textContent = "KN";
    } else if (atLoc instanceof Rook) {
      button.textContent = "R";
    } else if (atLoc instanceof Queen) {
      button.textContent = "Q";
    } else if (atLoc instanceof Bishop) {
      button.textContent = "B";
    } else {
      button.textContent = "";
    }
    button.setAttribute("id", "board-tile");
    button.pos = [i, j];
    button.addEventListener("click", () => {
      console.log(`${button.pos}`);
    });
    boardDisplay.appendChild(button);
  }
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    ctx.fillStyle = (i + j) % 2 === 1 ? "rgb(184,139,74)" : "rgb(227,193,111)";
    ctx.fillRect(i * 80, j * 81, 80, 81);
  }
}

root.appendChild(boardDisplay);
