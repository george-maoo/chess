class Piece {
  constructor(color, location, board, moveCount = 0) {
    this.color = color;
    this.location = location;
    this.board = board;
    this.moveCount = moveCount;
  }

  setPieceLoc(loc) {
    this.location = loc;
    this.moveCount += 1;
  }

  currentRow() {
    return this.location[0];
  }

  currentCol() {
    return this.location[1];
  }
}

export default Piece;
