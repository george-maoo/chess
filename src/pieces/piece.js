class Piece {
  constructor(color, location, board) {
    this.color = color;
    this.location = location;
    this.board = board;
  }

  setPieceLoc(loc) {
    this.location = loc;
  }
}

export default Piece;
