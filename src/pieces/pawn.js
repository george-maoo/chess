const Piece = require("./piece");

class Pawn extends Piece {
  string_rep() {
    return this.color === "black" ? "♟" : "♙";
  }

  // assume black always starts at top of board
  forwardDirection() {
    return this.color === "black" ? -1 : 1;
  }

  isAtStart() {
    const col = this.location[1];
    return (
      (this.color === "white" && col === 6) ||
      (this.color === "black" && col === 1)
    );
  }

  validMoves() {
    const [currentRow, currentCol] = this.location;
    const moves = [];
    let rowToCheck;
    let colToCheck;

    const oneStep = [currentRow + this.forwardDirection(), currentCol];
    const twoStep = [currentRow + this.forwardDirection() * 2, currentCol];
    const leftDiag = [currentRow + this.forwardDirection(), currentCol - 1];
    const rightDiag = [currentRow + this.forwardDirection(), currentCol + 1];

    [rowToCheck, colToCheck] = oneStep;
    if (
      this.board.isInBounds(oneStep) &&
      this.board.board[rowToCheck][colToCheck] === null
    ) {
      moves.push(oneStep);
    }

    [rowToCheck, colToCheck] = twoStep;
    if (
      this.board.isInBounds(twoStep) &&
      this.board.board[rowToCheck][colToCheck] === null
    ) {
      moves.push(twoStep);
    }
  }
}

module.exports = Pawn;
