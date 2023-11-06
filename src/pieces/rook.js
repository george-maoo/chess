import Piece from "./piece.js";
import { multiMove } from "./utils/movetype.js";

class Rook extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♜" : "♖";
  }

  pieceImage() {
    return this.color === "black" ? "img/pieces/br" : "img/pieces/wr";
  }

  moveDirections() {
    return [
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

export default Rook;
