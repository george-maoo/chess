const Piece = require("./piece");

class Queen extends Piece {
  string_rep() {
    return this.color === "black" ? "♛" : "♕";
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
  validMoves() {
    const moves = [];

    this.moveDirections().forEach(([rowDir, colDir]) => {
      let [rowToCheck, colToCheck] = this.location;

      while (true) {
        rowToCheck += rowDir;
        colToCheck += colDir;
        const posToCheck = [rowToCheck, colToCheck];

        if (!this.board.isInBounds(posToCheck)) break;

        if (this.board.board[rowToCheck][colToCheck] === null) {
          moves.push(posToCheck);
        } else {
          if (this.board.board[rowToCheck][colToCheck].color !== this.color) {
            moves.push(posToCheck);
          }
          break;
        }
      }
    });

    return moves;
  }
}

module.exports = Queen;
