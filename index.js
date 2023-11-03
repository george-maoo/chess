const Board = require("./src/board.js");
const Pawn = require("./src/pieces/pawn");
const Bishop = require("./src/pieces/bishop");
const Rook = require("./src/pieces/rook");
const Knight = require("./src/pieces/knight");
const Queen = require("./src/pieces/queen");
const King = require("./src/pieces/king");

const b = new Board();

b.placePiece(new Rook("black", [0, 0]), [0, 0]);
b.placePiece(new Knight("black", [0, 1]), [0, 1]);
b.placePiece(new Bishop("black", [0, 2]), [0, 2]);
b.placePiece(new Queen("black", [0, 3]), [0, 3]);
b.placePiece(new King("black", [0, 4]), [0, 4]);
b.placePiece(new Bishop("black", [0, 5]), [0, 5]);
b.placePiece(new Knight("black", [0, 6]), [0, 6]);
b.placePiece(new Rook("black", [0, 7]), [0, 7]);
for (let i = 0; i < 8; i++) {
  b.placePiece(new Pawn("black", [1, i]), [1, i]);
}

b.placePiece(new Rook("white", [7, 0]), [7, 0]);
b.placePiece(new Knight("white", [7, 1]), [7, 1]);
b.placePiece(new Bishop("white", [7, 2]), [7, 2]);
b.placePiece(new Queen("white", [7, 3]), [7, 3]);
b.placePiece(new King("white", [7, 4]), [7, 4]);
b.placePiece(new Bishop("white", [7, 5]), [7, 5]);
b.placePiece(new Knight("white", [7, 6]), [7, 6]);
b.placePiece(new Rook("white", [7, 7]), [7, 7]);
for (let i = 0; i < 8; i++) {
  b.placePiece(new Pawn("white", [6, i]), [6, i]);
}

b.printBoard();
