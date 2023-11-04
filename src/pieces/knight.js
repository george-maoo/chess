const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Knight extends Piece {
  stringRep() {
    return this.color === "black" ? "♞" : "♘";
  }

  moveDirections() {
    return [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [-1, -2],
    ];
  }

  validMoves() {
    return moveType.singleMove(this);
  }
}

module.exports = Knight;
