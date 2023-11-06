class Game {
  constructor(board, boardDisplay, chessBoard) {
    this.board = board;
    this.currentPlayer = "white";
    this.boardDisplay = boardDisplay;
    this.selectedPiece = null;
    this.chessBoard = chessBoard;
  }

  play() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const button = document.createElement("button");
        button.setAttribute("id", "board-tile");

        button.addEventListener("click", () => this.handleClick([row, col]));

        this.chessBoard.appendChild(button);
      }
    }
  }

  handleClick(loc) {
    const piece = this.board.atLocation(loc);

    if (!this.selectedPiece || piece.color === this.currentPlayer) {
      this.selectedPiece = piece;
    } else {
      this.playTurn(move);
    }

    this.boardDisplay.drawBoard(this.board, this.selectedPiece);
    this.selectedPiece = null;
  }

  playTurn(move) {
    const piece = this.selectedPiece;
    const pieceMoved = this.board.movePiece(piece.location, move);

    if (!pieceMoved) {
      this.selectedPiece = null;
      return;
    }

    console.log("Piece moved");
    if (this.board.isInCheck(this.currentPlayer)) {
      console.log(`${this.currentPlayer} is in check!`);
    }

    if (this.gameOver()) {
      this.endGame();
    }

    this.swapPlayers();
  }

  gameOver() {
    return this.board.isInCheckmate(this.currentPlayer);
  }

  endGame() {
    this.swapPlayers();
    console.log(`Checkmate! ${this.currentPlayer} wins!`);
    this.chessBoard.textContent = "";
  }

  swapPlayers() {
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
  }
}

export default Game;
