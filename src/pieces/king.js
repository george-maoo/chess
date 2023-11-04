const Piece = require("./piece");
const moveType = require("./utils/movetype");

class King extends Piece {
  string_rep() {
    return this.color === "black" ? "♚" : "♔";
  }

  moveDirections() {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
  }

  validMoves() {
    return moveType.singleMove(this);
  }
}

module.exports = King;
