const Piece = require("./piece");

class Pawn extends Piece {
  string_rep() {
    return this.color === "black" ? "♟" : "♙";
  }

  // assume black always starts at top of board
  forwardDirection() {
    return this.color === "black" ? 1 : -1;
  }

  isAtStart() {
    const row = this.location[0];
    return (
      (this.color === "white" && row === 6) ||
      (this.color === "black" && row === 1)
    );
  }

  // TODO refactor this
  validMoves() {
    const { board } = this;
    const forwardDir = this.forwardDirection();
    const [currentRow, currentCol] = this.location;
    const moves = [];

    const oneStep = [currentRow + forwardDir, currentCol];
    const twoStep = [currentRow + forwardDir * 2, currentCol];

    if (board.isPosEmpty(oneStep)) {
      moves.push(oneStep);
    }

    if (
      board.isPosEmpty(oneStep) &&
      board.isPosEmpty(twoStep) &&
      this.isAtStart()
    ) {
      moves.push(twoStep);
    }

    const leftDiag = [currentRow + forwardDir, currentCol - 1];
    const rightDiag = [currentRow + forwardDir, currentCol + 1];
    const diagMoves = [leftDiag, rightDiag].filter((move) =>
      board.isInBounds(move)
    );

    diagMoves.forEach((diagMove) => {
      const [rowToCheck, colToCheck] = diagMove;
      if (
        board.board[rowToCheck][colToCheck] !== null &&
        board.board[rowToCheck][colToCheck].color !== this.color
      ) {
        moves.push(diagMove);
      }
    });

    return moves;
  }
}

module.exports = Pawn;
