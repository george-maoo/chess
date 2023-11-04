const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Pawn extends Piece {
  stringRep() {
    return this.color === "black" ? "♟" : "♙";
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

  validMoves() {
    return moveType.pawnMove(this);
  }
}

module.exports = Pawn;
