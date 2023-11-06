import Piece from "./piece.js";
import { singleMove } from "./utils/movetype.js";

class Knight extends Piece {
  stringRep() {
    return this.color === "black" ? "♞" : "♘";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bn" : "img/pieces/wn";
  }

  moveDirections() {
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

  possibleMoves() {
    return singleMove(this);
  }
}

export default Knight;
