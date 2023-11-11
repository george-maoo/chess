import Piece from "./piece.js";

import { multiMove } from "./movetypes/multiMove.js";

class Rook extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♜" : "♖";
  }

  pieceImage() {
    return this.color === "black" ? "br.svg" : "wr.svg";
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
