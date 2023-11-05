const Piece = require("./piece");
const moveType = require("./utils/movetype");

class King extends Piece {
  stringRep() {
    return this.color === "black" ? "♚" : "♔";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bk" : "img/pieces/wk";
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
