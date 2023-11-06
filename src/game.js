class Game {
  constructor(board) {
    this.board = board;
    this.currentPlayer = "white";
  }

  attemptMove({ startPos, endPos }) {
    if (this.board.atLocation(startPos).color !== this.currentPlayer) {
      return;
    }
    if (!this.board.movePiece(startPos, endPos)) {
      return;
    }

    this.switchTurns();

    if (this.gameOver()) {
      this.switchTurns();
      return this.currentPlayer;
    }
  }

  switchTurns() {
    const playerToSwitchTo = this.currentPlayer === "white" ? "black" : "white";
    this.currentPlayer = playerToSwitchTo;
  }

  gameOver() {
    return this.board.isInCheckmate(this.currentPlayer);
  }
}

export default Game
