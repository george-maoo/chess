// exclusively for the king

// conditions for a castle:
// Neither the king nor the rook has previously moved
// There are no pieces between the king and the rook
// The king is not currently in check
// The king does not pass through or finish on a square that is attacked by an enemy piece

// checks the following conditions:
// The king is not currently in check.
// The king does not pass through or finish on a square that is attacked by an enemy piece.
const legalCastle = (king, offset) => {
  const { board } = king;
  const [kingRow, kingCol] = king.location;
  const enemyColor = king.color === "black" ? "white" : "black";

  if (
    board.colorCanMoveThere(enemyColor, [kingRow, kingCol]) ||
    board.colorCanMoveThere(enemyColor, [kingRow, kingCol + offset]) ||
    board.colorCanMoveThere(enemyColor, [kingRow, kingCol + offset * 2])
  ) {
    return false;
  }

  return true;
};

const castleMove = (king) => {
  const moves = [];
  const { board } = king;

  // king has not previously moved
  if (king.moveCount !== 0) return moves;

  const [kingRow, kingCol] = king.location;

  const leftRook = board.atLocation([kingRow, kingCol - 4]);
  const rightRook = board.atLocation([kingRow, kingCol + 3]);

  const rooks = [leftRook, rightRook];
  const offsets = [-1, 1];

  for (let i = 0; i < 2; i++) {
    const rook = rooks[i];
    const offset = offsets[i];

    // check if rook moved and rook can move to spot right beside king
    if (
      rook &&
      rook.moveCount === 0 &&
      board.includesMove(rook.possibleMoves(), [kingRow, kingCol + offset]) &&
      legalCastle(king, offset)
    ) {
      moves.push([kingRow, kingCol + 2 * offset]);
    }
  }

  return moves;
};

export { castleMove };
