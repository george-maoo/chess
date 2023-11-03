const Piece = require("./piece");

class King extends Piece {
  string_rep() {
    return this.color === "black" ? "♚" : "♔";
  }

  moves() {
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
}

module.exports = King;
