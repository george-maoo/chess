import Piece from "./piece.js";

import {singleMove} from "./movetypes/singleMove.js";

class King extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♚" : "♔";
  }

  pieceImage() {
    return this.color === "black" ? "bk.svg" : "wk.svg";
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

  possibleMoves() {
    return singleMove(this);
  }
}

export default King;
