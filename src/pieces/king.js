import Piece from "./piece.js";
import { singleMove } from "./utils/movetype.js";

class King extends Piece {
  stringRep() {
    return this.color === "black" ? "♚" : "♔";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bk" : "img/pieces/wk";
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

  validMoves() {
    return singleMove(this);
  }
}

export default King;
