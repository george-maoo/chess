const Piece = require("./piece");

class Knight extends Piece {
  string_rep() {
    return this.color === "black" ? "♞" : "♘";
  }
}

module.exports = Knight;
