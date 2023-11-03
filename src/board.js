const Pawn = require("./pieces/pawn");
const Bishop = require("./pieces/bishop");
const Rook = require("./pieces/rook");
const Knight = require("./pieces/knight");
const Queen = require("./pieces/queen");
const King = require("./pieces/king");

// the board to play on
class Board {
  constructor() {
    // TODO find a better way to initialize board
    this.board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
  }

  // initialize board
  initializeBoard() {
    this.placePiece(new Rook("black", [0, 0]), [0, 0], this);
    this.placePiece(new Knight("black", [0, 1]), [0, 1], this);
    this.placePiece(new Bishop("black", [0, 2]), [0, 2], this);
    this.placePiece(new Queen("black", [0, 3]), [0, 3], this);
    this.placePiece(new King("black", [0, 4]), [0, 4], this);
    this.placePiece(new Bishop("black", [0, 5]), [0, 5], this);
    this.placePiece(new Knight("black", [0, 6]), [0, 6], this);
    this.placePiece(new Rook("black", [0, 7]), [0, 7], this);
    for (let i = 0; i < 8; i++) {
      this.placePiece(new Pawn("black", [1, i]), [1, i], this);
    }

    this.placePiece(new Rook("white", [7, 0]), [7, 0], this);
    this.placePiece(new Knight("white", [7, 1]), [7, 1], this);
    this.placePiece(new Bishop("white", [7, 2]), [7, 2], this);
    this.placePiece(new Queen("white", [7, 3]), [7, 3], this);
    this.placePiece(new King("white", [7, 4]), [7, 4], this);
    this.placePiece(new Bishop("white", [7, 5]), [7, 5], this);
    this.placePiece(new Knight("white", [7, 6]), [7, 6], this);
    this.placePiece(new Rook("white", [7, 7]), [7, 7], this);
    for (let i = 0; i < 8; i++) {
      this.placePiece(new Pawn("white", [6, i]), [6, i], this);
    }
  }

  // displays the board on the terminal, will be removed when I set up a actual UI
  printBoard() {
    this.board.forEach((row) => {
      console.log("-".repeat(15));
      row.forEach((pos) => {
        process.stdout.write(`${pos === null ? " " : pos.string_rep()} `);
      });
      console.log();
    });
  }

  // piece = Piece class, location = 2 element array, 1st element row, 2nd element column
  placePiece(piece, [row, col]) {
    this.board[row][col] = piece;
  }

  // moves the piece from the start pos to end pos
  // TODO check if the specific piece type is allowed to move to end pos
  movePiece([initRow, initCol], [endRow, endCol]) {
    this.board[endRow][endCol] = this.board[initRow][initCol];
    this.board[initRow][initCol] = null;

    this.board[endRow][endCol].location = [endRow, endCol];
  }

  // checks if piece is in bounds
  isInBounds([row, col]) {
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[0].length
    );
  }
}

module.exports = Board;
