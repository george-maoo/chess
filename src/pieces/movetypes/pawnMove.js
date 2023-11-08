/*
for pawn movement:
allow up to 2 steps forward if at starting position
allow 1 step if not at starting position
allow capturing pieces if there is a enemy piece at the forward diagonal directions of pawn
allow en passant if en passant conditions are met
 */
const pawnMove = (piece) => {
  const { board } = piece;
  const forwardDir = piece.forwardDirection();
  const [row, col] = piece.location;
  const moves = [];
  const offsets = [-1, 1]; // used to calculate left and right side of pawn

  // forward moves
  const oneStep = [row + forwardDir, col];
  const twoStep = [row + forwardDir * 2, col];

  if (board.posIsEmpty(oneStep)) {
    moves.push(oneStep);
  }

  if (
    board.posIsEmpty(oneStep) &&
    board.posIsEmpty(twoStep) &&
    piece.isAtStart()
  ) {
    moves.push(twoStep);
  }

  // diagonal capture moves

  for (const offset of offsets) {
    const diagMove = [row + forwardDir, col + offset];
    if (
      board.isInBounds(diagMove) &&
      board.atLocation(diagMove) !== null &&
      board.atLocation(diagMove).color !== piece.color
    ) {
      moves.push(diagMove);
    }
  }

  // en passant

  /*
  The conditions for a pawn to capture an enemy pawn en passant are as follows:
    * the enemy pawn advanced two squares on the previous turn;
    * the capturing pawn attacks the square that the enemy pawn passed over.

  If these conditions are met, the capturing pawn can move diagonally forward to
  the square that the enemy pawn passed, capturing the enemy pawn as if it had
  moved only one square. If the right to capture en passant is not exercised
  immediately, it is subsequently lost. Making the capture is optional, unless
  there is no other legal move.
   */

  if (piece.inEnPassantPos()) {
    for (const offset of offsets) {
      const sideLoc = [row, col + offset];
      const diagMove = [row + forwardDir, col + offset];
      const atSideLoc = board.atLocation(sideLoc);

      // check if piece on side loc is a enemy pawn
      if (
        board.posNotEmpty(sideLoc) &&
        atSideLoc.constructor.name === "Pawn" &&
        atSideLoc.color !== piece.color &&
        atSideLoc.moveCount === 1
      ) {
        // check if pawn was moved last turn
        const prevPieceLoc = board.getPreviousMove().atOldPos.location;
        if (board.isSameLocation(prevPieceLoc, sideLoc)) moves.push(diagMove);
      }
    }
  }

  return moves;
};

export { pawnMove };
