class Game {
  constructor(board, boardDisplay, root) {
    this.board = board;
    this.currentPlayer = "white";
    this.boardDisplay = boardDisplay;
    this.selectedPiece = null;
    this.root = root;
  }

  startGame() {
    const chessBoard = document.createElement("div");
    chessBoard.setAttribute("id", "chess-board");

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const button = document.createElement("button");
        button.setAttribute("id", "board-tile");

        button.addEventListener("click", () => this.handleClick([row, col]));

        chessBoard.appendChild(button);
      }
    }

    this.root.appendChild(chessBoard);
    setTimeout(
      () =>
        this.boardDisplay.drawBoard(
          this.board,
          this.currentPlayer,
          this.selectedPiece
        ),
      100
    );
  }

  handleClick(loc) {
    const piece = this.board.atLocation(loc);

    if (!this.selectedPiece) {
      this.setSelectedPiece(piece);
    } else {
      this.playTurn(loc);
    }
  }

  setSelectedPiece(piece) {
    if (!piece || piece.color !== this.currentPlayer) return;

    this.selectedPiece = piece;
    this.boardDisplay.drawBoard(
      this.board,
      this.currentPlayer,
      this.selectedPiece
    );
  }

  playTurn(move) {
    const piece = this.selectedPiece;

    const pieceMoved = this.board.movePiece(piece.location, move);

    if (pieceMoved) this.swapPlayers();

    this.selectedPiece = null;
    this.boardDisplay.drawBoard(
      this.board,
      this.currentPlayer,
      this.selectedPiece
    );

    if (this.gameOver()) {
      this.endGame();
    }
  }

  gameOver() {
    return this.board.isInCheckmate(this.currentPlayer);
  }

  endGame() {
    this.swapPlayers();
    console.log(`Checkmate! ${this.currentPlayer} wins!`);
    document.getElementById("chess-board").textContent = "";
  }

  swapPlayers() {
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
  }
}

export default Game;
