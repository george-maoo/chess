import Piece from "./piece.js";
import { multiMove } from "./utils/movetype.js";

class Queen extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♛" : "♕";
  }

  pieceImage() {
    return this.color === "black" ? "img/pieces/bq" : "img/pieces/wq";
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
