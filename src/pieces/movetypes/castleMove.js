// exclusively for the king

// Neither the king nor the rook has previously moved. DONE
// There are no pieces between the king and the rook. DONE
// The king is not currently in check. TODO
// The king does not pass through or finish on a square that is attacked by an enemy piece. TODO

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
      board.includesMove(rook.possibleMoves(), [kingRow, kingCol + offset])
    ) {
      moves.push([kingRow, kingCol + 2 * offset]);
    }
  }

  return moves;
};

export { castleMove };
