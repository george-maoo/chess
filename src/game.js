const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Game {
  constructor(board) {
    this.board = board;
    this.currentPlayer = "white";
  }

  async play() {
    const { board } = this;

    while (!this.gameOver()) {
      await this.playTurn();
      this.switchTurns();
    }

    this.switchTurns();
    board.printBoard();
    console.log(`Game over, ${this.currentPlayer} wins!`);
    rl.close();
  }

  switchTurns() {
    const playerToSwitchTo = this.currentPlayer === "white" ? "black" : "white";
    this.currentPlayer = playerToSwitchTo;
  }

  parseUserInput(userInput) {
    return userInput.split(" ").map((x) => parseInt(x));
  }

  // youre joking i need async programming for user input??????
  async playTurn() {
    const { board, parseUserInput, currentPlayer } = this;

    while (true) {
      board.printBoard();
      console.log(`It is now ${currentPlayer}'s turn`);
      if (board.isInCheck()) console.log("You are in check");

      const startPos = await rl.question("Enter a starting position: \n");
      const endPos = await rl.question("Enter a ending position: \n");

      if (board.movePiece(parseUserInput(startPos), parseUserInput(endPos))) {
        console.log(`${currentPlayer} moved from ${startPos} to ${endPos}`);
        break;
      }

      console.log("Invalid move");
    }
  }

  gameOver() {
    return this.board.isInCheckmate(this.currentPlayer);
  }
}

module.exports = Game;
