import Piece from "./piece.js";

import {multiMove} from "./movetypes/multiMove.js";

class Bishop extends Piece {
  pieceSymbol() {
    return this.color === "black" ? "♝" : "♗";
  }

  pieceImage() {
    return this.color === "black" ? "bb.svg" : "wb.svg";
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
