const Piece = require("./piece");

class King extends Piece {
  string_rep() {
    return this.color === "black" ? "♚" : "♔";
  }
}

module.exports = King;
