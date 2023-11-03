// the board to play on
class Board {
  constructor() {
    this.board = [...Array(8)].map((e) => Array(8));
  }

  // displays the board
  printBoard() {
    this.board.forEach((row) => {
      console.log("-".repeat(15));
      row.forEach((pos) => {
        process.stdout.write(`${pos} `);
      });
      console.log();
    });
  }

  // piece = Piece class, location = 2 element array, 1st element row, 2nd element column
  placePiece(piece, location) {
    const [row, col] = location;
    this.board[row][col] = piece;
  }

  // checks if piece is in bounds
  isInBounds(location) {
    const [row, col] = location;
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[0].length
    );
  }
}

module.exports = Board;
