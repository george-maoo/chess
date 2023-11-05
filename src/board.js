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

  // displays the board on the terminal, will be removed when I set up a actual UI
  printBoard() {
    let board = "";
    this.board.forEach((row) => {
      board += "-".repeat(15) + "\n";

      row.forEach((pos) => {
        board += `${pos === null ? " " : pos.stringRep()} `;
      });
      board += "\n";
    });
    console.log(board);
  }

  // initialize board
  initializeBoard() {
    this.placePiece(new Rook("black", [0, 0], this), [0, 0]);
    this.placePiece(new Knight("black", [0, 1], this), [0, 1]);
    this.placePiece(new Bishop("black", [0, 2], this), [0, 2]);
    this.placePiece(new Queen("black", [0, 3], this), [0, 3]);
    this.placePiece(new King("black", [0, 4], this), [0, 4]);
    this.placePiece(new Bishop("black", [0, 5], this), [0, 5]);
    this.placePiece(new Knight("black", [0, 6], this), [0, 6]);
    this.placePiece(new Rook("black", [0, 7], this), [0, 7]);
    for (let i = 0; i < 8; i++) {
      this.placePiece(new Pawn("black", [1, i], this), [1, i]);
    }

    this.placePiece(new Rook("white", [7, 0], this), [7, 0]);
    this.placePiece(new Knight("white", [7, 1], this), [7, 1]);
    this.placePiece(new Bishop("white", [7, 2], this), [7, 2]);
    this.placePiece(new Queen("white", [7, 3], this), [7, 3]);
    this.placePiece(new King("white", [7, 4], this), [7, 4]);
    this.placePiece(new Bishop("white", [7, 5], this), [7, 5]);
    this.placePiece(new Knight("white", [7, 6], this), [7, 6]);
    this.placePiece(new Rook("white", [7, 7], this), [7, 7]);
    for (let i = 0; i < 8; i++) {
      this.placePiece(new Pawn("white", [6, i], this), [6, i]);
    }
  }

  // getter
  atLocation([row, col]) {
    return this.board[row][col];
  }

  // setter
  placePiece(piece, [row, col]) {
    this.board[row][col] = piece;
  }

  // gets all pieces of a specified color, or all pieces if no color is specified
  getPieces(color = "all") {
    const pieces = this.board.flat(1);
    if (color === "all") {
      return pieces.filter((piece) => piece !== null);
    } else {
      return pieces.filter((piece) => piece !== null && piece.color === color);
    }
  }

  // checks if move is included in listOfMoves, returns true if included, false if not
  includesMove(listOfMoves, endPos) {
    return listOfMoves.some(
      (move) => move[0] === endPos[0] && move[1] === endPos[1]
    );
  }

  // moves the piece from the start pos to end pos
  // returns true if piece is moved, returns false if end position is invalid
  movePiece(startPos, endPos) {
    // check if given start pos is in bounds before doing anything
    if (!this.isInBounds(startPos)) return false;

    // check if piece exists
    // check if end position is included in the valid moves of the piece
    const piece = this.atLocation(startPos);

    if (!piece || !this.includesMove(endPos, piece.validMoves())) {
      return false;
    }

    this.placePiece(this.atLocation(startPos), endPos);
    this.placePiece(null, startPos);

    this.atLocation(endPos).location = endPos;
    return true;
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

  isPosEmpty(posToCheck) {
    return this.isInBounds(posToCheck) && this.atLocation(posToCheck) === null;
  }

  // find the king with the color passed in - DONE
  // check all enemy moves to see if the king gets hit by any of them - DONE
  // return true if in check, false if not
  isInCheck(color) {
    const king = this.getPieces(color).find((piece) => piece instanceof King);
    const enemyColor = color === "black" ? "white" : "black";

    for (const enemyPiece of this.getPieces(enemyColor)) {
      if (this.includesMove(enemyPiece.validMoves(), king.location)) {
        return true;
      }
    }

    return false;
  }
}

module.exports = Board;
