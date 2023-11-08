import Piece from "./piece.js";

import { singleMove } from "./movetypes/singleMove.js";
import { castleMove } from "./movetypes/castleMove.js";

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

  doingCastle([startRow, startCol], [endRow, endCol]) {
    return Math.abs(endCol - startCol) !== 1 && startRow === endRow;
  }

  possibleMoves() {
    return [...singleMove(this), ...castleMove(this)];
  }
}

export default King;
