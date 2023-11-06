import Piece from "./piece.js";
import { multiMove } from "./utils/movetype.js";

class Queen extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♛" : "♕";
  }

  pieceImage() {
    return this.color === "black" ? "bq.svg" : "wq.svg";
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
    return multiMove(this);
  }
}

export default Queen;
