import Piece from "./piece.js";
import { multiMove } from "./utils/movetype.js";

class Bishop extends Piece {
  stringRep() {
    return this.color === "black" ? "♝" : "♗";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bb" : "img/pieces/wb";
  }

  moveDirections() {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
  }

  possibleMoves() {
    return multiMove(this);
  }
}

export default Bishop;
