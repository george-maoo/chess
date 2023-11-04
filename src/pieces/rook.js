const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Rook extends Piece {
  string_rep() {
    return this.color === "black" ? "♜" : "♖";
  }

  moveDirections() {
    return [
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

module.exports = Rook;
