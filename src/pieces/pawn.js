const Piece = require("./piece");

class Pawn extends Piece {
  string_rep() {
    return this.color === "black" ? "♟" : "♙";
  }
}

module.exports = Pawn;
