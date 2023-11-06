import Board from "./board.js";

const board = new Board();
board.initializeBoard();

const root = document.getElementById("root");

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "my-canvas");
canvas.setAttribute("height", 648);
canvas.setAttribute("width", 640);

const ctx = canvas.getContext("2d");
root.appendChild(canvas);

const boardDisplay = document.createElement("div");
boardDisplay.setAttribute("id", "chess-board");

let pieceSelected = false;
const x = [];
let currentPlayer = "white";

const swapPlayers = () => {
  currentPlayer = currentPlayer === "white" ? "black" : "white";
};

const gamePlayFunc = (loc) => {
  if (!pieceSelected) {
    const piece = board.atLocation(loc);
    if (piece === null) return;

    if (piece.color !== currentPlayer) {
      console.log("It is not your turn");
      return;
    }

    pieceSelected = true;
    x.push(loc);
    highlightMoves(piece);
    console.log("Piece selected");
  } else {
    const startPos = x.pop();
    if (board.movePiece(startPos, loc)) {
      console.log("Piece moved");
      swapPlayers();
      if (board.isInCheck(currentPlayer)) {
        console.log(`${currentPlayer} is in check!`);
      }
    } else {
      console.log("Invalid move");
    }
    renderBoard();
    drawPieces();
    if (gameOver()) {
      swapPlayers();
      console.log(`Checkmate! ${currentPlayer} wins!`);
      endGame();
    }
    pieceSelected = false;
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
  console.log(`It is ${currentPlayer}'s turn`);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle =
        (i + j) % 2 === 1 ? "rgb(184,139,74)" : "rgb(227,193,111)";
      ctx.fillRect(i * 80, j * 81, 80, 81);
    }
  }
};

const drawPieces = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board.atLocation([i, j]);
      if (piece !== null) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 80 * j, 81 * i, 80, 81);
        };
        img.src = `./../src/img/pieces/${piece.pieceImage()}`;
      }
    }
  }
};

const highlightMoves = (piece) => {
  ctx.strokeStyle = "maroon";
  ctx.lineWidth = 3;
  for (const [row, col] of board.legalMoves(piece)) {
    ctx.strokeRect(col * 80, row * 81, 78, 80);
  }
};

const gameOver = () => {
  return board.isInCheckmate(currentPlayer);
};

const endGame = () => {
  document.getElementById("chess-board").textContent = "";
};

renderBoard();
drawPieces();

root.appendChild(boardDisplay);
