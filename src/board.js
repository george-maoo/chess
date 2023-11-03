// the board to play on
class Board {
  constructor() {
    // TODO find a better way to initialize board
    this.board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
  }

  // displays the board
  printBoard() {
    this.board.forEach((row) => {
      console.log("-".repeat(15));
      row.forEach((pos) => {
        process.stdout.write(`${pos === null ? " " : pos.string_rep()} `);
      });
      console.log();
    });
  }

  // piece = Piece class, location = 2 element array, 1st element row, 2nd element column
  placePiece(piece, [row, col]) {
    this.board[row][col] = piece;
  }

  // moves the piece from the start pos to end pos
  // TODO check if the specific piece type is allowed to move to end pos
  movePiece([initRow, initCol], [endRow, endCol]) {
    this.board[endRow][endCol] = this.board[initRow][initCol];
    this.board[initRow][initCol] = null;

    this.board[endRow][endCol].location = [endRow, endCol];
  }

  // checks if piece is in bounds
  isInBounds([row, col]) {
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[0].length
    );
  }
}

module.exports = Board;
