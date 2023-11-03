const Piece = require("./piece");

class Bishop extends Piece {
  string_rep() {
    return this.color === "black" ? "♝" : "♗";
  }

  moves() {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
  }
}

module.exports = Bishop;
