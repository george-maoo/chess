const Piece = require("./piece");

class Rook extends Piece {
  string_rep() {
    return this.color === "black" ? "♜" : "♖";
  }
}

module.exports = Rook;
