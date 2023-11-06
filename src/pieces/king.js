import Piece from "./piece.js";
import { singleMove } from "./utils/movetype.js";

class King extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♚" : "♔";
  }

  pieceImage() {
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

  possibleMoves() {
    return singleMove(this);
  }
}

export default King;
