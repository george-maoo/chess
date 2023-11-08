import Piece from "./piece.js";
import Queen from "./queen.js";
import { pawnMove } from "./movetypes/pawnMove.js";

class Pawn extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♟" : "♙";
  }

  pieceImage() {
    return this.color === "black" ? "bp.svg" : "wp.svg";
  }

  // assume black always starts at top of board
  forwardDirection() {
    return this.color === "black" ? 1 : -1;
  }

  isAtStart() {
    const row = this.location[0];
    return (
      (this.color === "white" && row === 6) ||
      (this.color === "black" && row === 1)
    );
  }

  isAtEnd() {
    const row = this.location[0];
    return (
      (this.color === "white" && row === 0) ||
      (this.color === "black" && row === 7)
    );
  }

  promote(pieceChoice) {
    if (pieceChoice === "queen") {
      const queen = new Queen(
        this.color,
        this.location,
        this.board,
        this.moveCount
      );

      this.board.setLocation(queen, this.location);
    }
  }

  setPieceLoc(loc) {
    this.location = loc;
    this.moveCount += 1;
    if (this.isAtEnd()) this.promote("queen");
  }

  inEnPassantPos() {
    return (
      (this.color === "white" && this.currentRow() === 3) ||
      (this.color === "black" && this.currentRow() === 4)
    );
  }

  doingEnPassant(endPos) {
    const [row, col] = this.location;

    const leftDiag = [row + this.forwardDirection(), col - 1];
    const rightDiag = [row + this.forwardDirection(), col + 1];

    return (
      (this.board.isSameLocation(endPos, leftDiag) ||
        this.board.isSameLocation(endPos, rightDiag)) &&
      this.board.atLocation(endPos) === null
    );
  }

  possibleMoves() {
    return pawnMove(this);
  }
}

export default Pawn;
