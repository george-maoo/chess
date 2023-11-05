const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Rook extends Piece {
  stringRep() {
    return this.color === "black" ? "♜" : "♖";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/br" : "img/pieces/wr";
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
