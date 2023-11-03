const Piece = require("./piece");

class Bishop extends Piece {
  string_rep() {
    return this.color === "black" ? "♝" : "♗";
  }
}

module.exports = Bishop;
