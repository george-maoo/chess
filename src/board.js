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
    const pieceOrder = [
      Rook,
      Knight,
      Bishop,
      Queen,
      King,
      Bishop,
      Knight,
      Rook,
    ];

    // initialize black pieces
    for (let i = 0; i < 8; i++) {
      this.setLocation(new pieceOrder[i]("black", [0, i], this), [0, i]);
      this.setLocation(new Pawn("black", [1, i], this), [1, i]);
    }

    // initialize white pieces
    for (let i = 0; i < 8; i++) {
      this.setLocation(new Pawn("white", [6, i], this), [6, i]);
      this.setLocation(new pieceOrder[i]("white", [7, i], this), [7, i]);
    }
  }

  atLocation([row, col]) {
    return this.board[row][col];
  }

  setLocation(piece, [row, col]) {
    this.board[row][col] = piece;
  }

  swapLocations(loc1, loc2) {
    const atLoc1 = this.atLocation(loc1);
    const atLoc2 = this.atLocation(loc2);

    if (atLoc1) atLoc1.setPieceLoc(loc2);
    this.setLocation(atLoc1, loc2);

    if (atLoc2) atLoc2.setPieceLoc(loc1);
    this.setLocation(atLoc2, loc1);
  }

  isSameLocation([row1, col1], [row2, col2]) {
    return row1 === row2 && col1 === col2;
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

  posIsEmpty(posToCheck) {
    return this.isInBounds(posToCheck) && this.atLocation(posToCheck) === null;
  }

  posNotEmpty(posToCheck) {
    return this.isInBounds(posToCheck) && this.atLocation(posToCheck) !== null;
  }

  // checks if move is included in listOfMoves
  includesMove(listOfMoves, endPos) {
    return listOfMoves.some((move) => this.isSameLocation(move, endPos));
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

    const legalMoves = this.legalMoves(piece);
    return this.includesMove(legalMoves, endPos);
  }

  // returns true if piece is moved, returns false if end position is invalid
  movePiece(startPos, endPos) {
    if (!this.moveIsLegal(startPos, endPos)) return false;

    const piece = this.atLocation(startPos);

    // en passant check
    if (piece instanceof Pawn && piece.doingEnPassant(endPos)) {
      const [endRow, endCol] = endPos;
      this.swapLocations(endPos, [endRow - piece.forwardDirection(), endCol]);
    }

    // castling check
    if (piece instanceof King && piece.doingCastle(startPos, endPos)) {
      const [startRow, startCol] = startPos;
      const [_, endCol] = endPos;

      endCol > startCol
        ? this.swapLocations([startRow, 7], [startRow, 5])
        : this.swapLocations([startRow, 0], [startRow, 3]);
    }

    this.storeLastMove(startPos, endPos);

    this.setLocation(this.atLocation(startPos), endPos);
    this.setLocation(null, startPos);

    this.atLocation(endPos).setPieceLoc(endPos);
    return true;
  }

  storeLastMove(startPos, endPos, moveType = null) {
    const move = {
      oldPos: startPos,
      newPos: endPos,
      atOldPos: this.atLocation(startPos),
      atNewPos: this.atLocation(endPos),
      moveType: moveType,
    };

    this.previousMoves.push(move);
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

  getPreviousMove() {
    return this.previousMoves[this.previousMoves.length - 1];
  }

  // returns true if any piece of the color specified can move to loc
  colorCanMoveThere(color, loc) {
    for (const piece of this.getPieces(color)) {
      if (this.includesMove(piece.possibleMoves(), loc)) {
        return true;
      }
    }

    return false;
  }

  // check all enemy moves to see if the king gets hit by any of them
  isInCheck(color) {
    const king = this.getPieces(color).find((piece) => piece instanceof King);
    if (!king) {
      return false;
    }

    const enemyColor = color === "black" ? "white" : "black";

    return this.colorCanMoveThere(enemyColor, king.location);
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
