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
export { multiMove };
