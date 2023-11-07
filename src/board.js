import Pawn from "./pieces/pawn.js";
import Bishop from "./pieces/bishop.js";
import Rook from "./pieces/rook.js";
import Knight from "./pieces/knight.js";
import Queen from "./pieces/queen.js";
import King from "./pieces/king.js";

// the board to play on
class Board {
  constructor() {
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
    this.previousMoves = [];
  }

  // initialize board
  initializeBoard() {
    this.setLocation(new Rook("black", [0, 0], this), [0, 0]);
    this.setLocation(new Knight("black", [0, 1], this), [0, 1]);
    this.setLocation(new Bishop("black", [0, 2], this), [0, 2]);
    this.setLocation(new Queen("black", [0, 3], this), [0, 3]);
    this.setLocation(new King("black", [0, 4], this), [0, 4]);
    this.setLocation(new Bishop("black", [0, 5], this), [0, 5]);
    this.setLocation(new Knight("black", [0, 6], this), [0, 6]);
    this.setLocation(new Rook("black", [0, 7], this), [0, 7]);
    for (let i = 0; i < 8; i++) {
      this.setLocation(new Pawn("black", [1, i], this), [1, i]);
    }

    this.setLocation(new Rook("white", [7, 0], this), [7, 0]);
    this.setLocation(new Knight("white", [7, 1], this), [7, 1]);
    this.setLocation(new Bishop("white", [7, 2], this), [7, 2]);
    this.setLocation(new Queen("white", [7, 3], this), [7, 3]);
    this.setLocation(new King("white", [7, 4], this), [7, 4]);
    this.setLocation(new Bishop("white", [7, 5], this), [7, 5]);
    this.setLocation(new Knight("white", [7, 6], this), [7, 6]);
    this.setLocation(new Rook("white", [7, 7], this), [7, 7]);
    for (let i = 0; i < 8; i++) {
      this.setLocation(new Pawn("white", [6, i], this), [6, i]);
    }
  }

  atLocation([row, col]) {
    return this.board[row][col];
  }

  setLocation(piece, [row, col]) {
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

  // checks if move is included in listOfMoves
  includesMove(listOfMoves, endPos) {
    return listOfMoves.some(
      (move) => move[0] === endPos[0] && move[1] === endPos[1]
    );
  }

  // checks that a move doesnt put king in check
  moveIsSafe(piece, move) {
    const startPos = piece.location;
    this.storeLastMove(startPos, move);

    this.setLocation(this.atLocation(startPos), move);
    this.setLocation(null, startPos);
    piece.location = move;

    const safe = !this.isInCheck(piece.color);
    this.undoLastMove();

    return safe;
  }

  legalMoves(piece) {
    return piece.possibleMoves().filter((move) => this.moveIsSafe(piece, move));
  }

  moveIsLegal(startPos, endPos) {
    if (!this.isInBounds(startPos)) return false;

    const piece = this.atLocation(startPos);
    if (!piece) return false;

    return this.includesMove(this.legalMoves(piece), endPos);
  }

  // returns true if piece is moved, returns false if end position is invalid
  movePiece(startPos, endPos) {
    if (!this.moveIsLegal(startPos, endPos)) return false;

    this.storeLastMove(startPos, endPos);

    this.setLocation(this.atLocation(startPos), endPos);
    this.setLocation(null, startPos);

    this.atLocation(endPos).setPieceLoc(endPos);
    return true;
  }

  storeLastMove(startPos, endPos) {
    const move = {
      oldPos: startPos,
      newPos: endPos,
      atOldPos: this.atLocation(startPos),
      atNewPos: this.atLocation(endPos),
    };

    this.previousMoves.push(move);
    console.log(move);
    console.log(this.previousMoves);
  }

  undoLastMove() {
    const lastMove = this.previousMoves.pop();
    this.setLocation(lastMove.atOldPos, lastMove.oldPos);
    lastMove.atOldPos.location = lastMove.oldPos;

    if (lastMove.atNewPos === null) {
      this.setLocation(null, lastMove.newPos);
    } else {
      this.setLocation(lastMove.atNewPos, lastMove.newPos);
      lastMove.atNewPos.location = lastMove.newPos;
    }
  }

  // check all enemy moves to see if the king gets hit by any of them
  isInCheck(color) {
    const king = this.getPieces(color).find((piece) => piece instanceof King);
    if (!king) {
      return false;
    }

    const enemyColor = color === "black" ? "white" : "black";

    for (const enemyPiece of this.getPieces(enemyColor)) {
      if (this.includesMove(enemyPiece.possibleMoves(), king.location)) {
        return true;
      }
    }

    return false;
  }

  // check all moves that the player in check can make
  // if none of those moves move them out of checkmate, return true, else return false
  isInCheckmate(color) {
    if (!this.isInCheck(color)) return false;

    for (const piece of this.getPieces(color)) {
      if (this.legalMoves(piece).length !== 0) return false;
    }

    return true;
  }
}

export default Board;
