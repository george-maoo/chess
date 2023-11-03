const Piece = require("./piece");

class Queen extends Piece {
  string_rep() {
    return this.color === "black" ? "♛" : "♕";
  }
}

module.exports = Queen;
