const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Bishop extends Piece {
  stringRep() {
    return this.color === "black" ? "♝" : "♗";
  }

  moveDirections() {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
  }

  validMoves() {
    return moveType.multiMove(this);
  }
}

module.exports = Bishop;
