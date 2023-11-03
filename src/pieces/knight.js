const Piece = require("./piece");

class Knight extends Piece {
  string_rep() {
    return this.color === "black" ? "♞" : "♘";
  }

  moves() {
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
}

module.exports = Knight;
