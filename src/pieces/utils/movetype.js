// for all pieces that can move multiple tiles:
/*
for every move in possibleMoves, check every possible move in that direction
until you hit:
  - another piece
    - if piece is same color:
      - dont add the position as a valid move
    - if piece is a enemy:
      - add the enemy piece's location as a valid move
  - move goes out of bounds
*/

const multiMove = (piece) => {
  const { board } = piece;
  const moves = [];

  piece.moveDirections().forEach(([rowDir, colDir]) => {
    let [rowToCheck, colToCheck] = piece.location;

    while (true) {
      rowToCheck += rowDir;
      colToCheck += colDir;
      const posToCheck = [rowToCheck, colToCheck];

      if (!board.isInBounds(posToCheck)) break;

      if (board.atLocation(posToCheck) === null) {
        moves.push(posToCheck);
      } else {
        if (board.atLocation(posToCheck).color !== piece.color) {
          moves.push(posToCheck);
        }
        break;
      }
    }
  });

  return moves;
};

// same as the above, but singleMove will only check the move direction once instead of looping
const singleMove = (piece) => {
  const { board } = piece;
  const moves = [];

  piece.moveDirections().forEach(([rowDir, colDir]) => {
    let [rowToCheck, colToCheck] = piece.location;

    rowToCheck += rowDir;
    colToCheck += colDir;
    const posToCheck = [rowToCheck, colToCheck];

    if (!board.isInBounds(posToCheck)) return;

    if (board.atLocation(posToCheck) === null) {
      moves.push(posToCheck);
    } else {
      if (board.atLocation(posToCheck).color !== piece.color) {
        moves.push(posToCheck);
      }
    }
  });

  return moves;
};

/*
for pawn movement:
allow up to 2 steps forward if at starting position
allow 1 step if not at starting position
allow capturing pieces if there is a enemy piece at the forward diagonal directions of pawn
 */
const pawnMove = (piece) => {
  const { board } = piece;
  const forwardDir = piece.forwardDirection();
  const [currentRow, currentCol] = piece.location;
  const moves = [];

  const oneStep = [currentRow + forwardDir, currentCol];
  const twoStep = [currentRow + forwardDir * 2, currentCol];

  if (board.isPosEmpty(oneStep)) {
    moves.push(oneStep);
  }

  if (
    board.isPosEmpty(oneStep) &&
    board.isPosEmpty(twoStep) &&
    piece.isAtStart()
  ) {
    moves.push(twoStep);
  }

  const leftDiag = [currentRow + forwardDir, currentCol - 1];
  if (
    board.isInBounds(leftDiag) &&
    board.atLocation(leftDiag) !== null &&
    board.atLocation(leftDiag).color !== piece.color
  ) {
    moves.push(leftDiag);
  }

  const rightDiag = [currentRow + forwardDir, currentCol + 1];
  if (
    board.isInBounds(rightDiag) &&
    board.atLocation(rightDiag) !== null &&
    board.atLocation(rightDiag).color !== piece.color
  ) {
    moves.push(rightDiag);
  }

  return moves;
};

export { singleMove, multiMove, pawnMove };
