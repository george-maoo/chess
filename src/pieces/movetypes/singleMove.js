// same logic as multiMove, but singleMove will only check the move direction once instead of looping
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
export { singleMove };
