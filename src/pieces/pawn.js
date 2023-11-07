import Piece from "./piece.js";
import { pawnMove } from "./utils/movetype.js";
import Queen from "./queen.js";

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

  promote() {
    const queen = new Queen(this.color, this.location, this.board);
    this.board.setLocation(queen, this.location);
  }

  setPieceLoc(loc) {
    this.location = loc;
    if (this.isAtEnd()) this.promote();
  }

  possibleMoves() {
    return pawnMove(this);
  }
}

export default Pawn;
