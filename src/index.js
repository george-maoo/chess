import Board from "./board.js";
import BoardDisplay from "./pieceImages.js";
import King from "./pieces/king.js";

const root = document.getElementById("root");

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "my-canvas");
canvas.setAttribute("height", 648);
canvas.setAttribute("width", 640);

const ctx = canvas.getContext("2d");
root.appendChild(canvas);

const board = new Board();
board.initializeBoard();

const pieceImages = new BoardDisplay();

const chessBoard = document.createElement("div");
chessBoard.setAttribute("id", "chess-board");

const drawBoard = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle =
        (i + j) % 2 === 1 ? "rgb(184,139,74)" : "rgb(227,193,111)";
      ctx.fillRect(i * 80, j * 80, 80, 80);

      const piece = board.atLocation([j, i]);
      if (piece) {
        drawPiece(piece);
      }
    }
  }
};

const drawPiece = (piece, bgColor = null) => {
  const [row, col] = piece.location;
  ctx.beginPath();
  if (bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(col * 80, row * 80, 80, 80);
    ctx.drawImage(pieceImages.getPieceImage(piece), col * 80, row * 80, 80, 80);
  }
  ctx.drawImage(pieceImages.getPieceImage(piece), col * 80, row * 80, 80, 80);
};

const highlightMoves = (piece) => {
  for (const [row, col] of board.legalMoves(piece)) {
    ctx.beginPath();
    piece = board.atLocation([row, col]);

    if (piece) {
      drawPiece(piece, "red");
    } else {
      ctx.fillStyle = "rgb(66, 66, 67)";
      ctx.save();
      ctx.arc(col * 80 + 40, row * 80 + 40, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
};

const gameOver = () => {
  return board.isInCheckmate(currentPlayer);
};

const kingInCheck = () => {
  const king = board
    .getPieces(currentPlayer)
    .find((piece) => piece instanceof King);
  drawPiece(king, "red");
};

const endGame = () => {
  kingInCheck();

  swapPlayers();
  document.getElementById("chess-board").textContent = "";
};

setUpBoard();
setTimeout(() => {
  drawBoard();
}, 10);

root.appendChild(chessBoard);
