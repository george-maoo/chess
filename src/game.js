class Game {
  constructor(board) {
    this.board = board;
    this.currentPlayer = 1;
  }

  play() {
    while (true) {
      board.printBoard();
      playTurn();
      this.switchTurns();
    }
  }

  switchTurns() {
    const playerToSwitchTo = this.currentPlayer === 1 ? 2 : 1;
    this.currentPlayer = playerToSwitchTo;
  }

  playTurn() {}
}

module.exports = Game;
