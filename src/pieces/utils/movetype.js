// for all pieces that can move multiple tiles:
/*
for every move in validMoves, check every possible move in that direction
until you hit:
  - another piece
    - if piece is same color:
      - dont add the position as a valid move
    - if piece is a enemy:
      - add the enemy piece's location as a valid move
  - move goes out of bounds
*/

const multiMove = (piece) => {
  const moves = [];

  piece.moveDirections().forEach(([rowDir, colDir]) => {
    let [rowToCheck, colToCheck] = piece.location;

    while (true) {
      rowToCheck += rowDir;
      colToCheck += colDir;
      const posToCheck = [rowToCheck, colToCheck];

      if (!piece.board.isInBounds(posToCheck)) break;

      if (piece.board.board[rowToCheck][colToCheck] === null) {
        moves.push(posToCheck);
      } else {
        if (piece.board.board[rowToCheck][colToCheck].color !== piece.color) {
          moves.push(posToCheck);
        }
        break;
      }
    }
  });

  return moves;
};

const singleMove = (piece) => {
  const moves = [];

  piece.moveDirections().forEach(([rowDir, colDir]) => {
    let [rowToCheck, colToCheck] = piece.location;

    rowToCheck += rowDir;
    colToCheck += colDir;
    const posToCheck = [rowToCheck, colToCheck];

    if (!piece.board.isInBounds(posToCheck)) return;

    if (piece.board.board[rowToCheck][colToCheck] === null) {
      moves.push(posToCheck);
    } else {
      if (piece.board.board[rowToCheck][colToCheck].color !== piece.color) {
        moves.push(posToCheck);
      }
    }
  });

  return moves;
};

module.exports = {
  multiMove,
  singleMove,
};
