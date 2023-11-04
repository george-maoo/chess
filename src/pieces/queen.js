const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Queen extends Piece {
  string_rep() {
    return this.color === "black" ? "♛" : "♕";
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
    return moveType.multiMove(this);
  }
}

module.exports = Queen;
