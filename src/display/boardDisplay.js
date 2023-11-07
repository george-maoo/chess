import PieceImages from "./pieceImages.js";

class BoardDisplay {
  constructor(root, board) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "my-canvas");
    canvas.setAttribute("height", 640);
    canvas.setAttribute("width", 640);
    root.appendChild(canvas);

    this.ctx = canvas.getContext("2d");
    this.pieceImages = new PieceImages();
    this.boardColor1 = "rgb(184,139,74)";
    this.boardColor2 = "rgb(227,193,111)";
    this.board = board;
    this.tileSize = 80;
  }

  drawBoard(board, color, selectedPiece = null) {
    const { tileSize } = this;

    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        this.ctx.beginPath();
        this.ctx.fillStyle =
          (col + row) % 2 === 0 ? this.boardColor1 : this.boardColor2;
        this.ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

        const piece = this.board.atLocation([row, col]);

        if (piece) this.drawPiece(piece);
      }
    }

    if (selectedPiece) {
      this.drawPiece(selectedPiece, "rgb(66, 90, 148)");
      this.highlightMoves(selectedPiece);
    }

    if (this.board.isInCheck(color)) {
      this.highlightKing(color);
    }
  }

  drawPiece(piece, bgColor = null) {
    const { tileSize } = this;
    const [row, col] = piece.location;
    const pieceImage = this.pieceImages.getPieceImage(piece);

    this.ctx.beginPath();
    if (bgColor) {
      this.ctx.fillStyle = bgColor;
      this.ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }

    this.ctx.drawImage(
      pieceImage,
      col * tileSize,
      row * tileSize,
      tileSize,
      tileSize
    );
  }

  highlightMoves(piece) {
    const { tileSize } = this;
    const dotCenter = tileSize / 2;

    for (const [row, col] of this.board.legalMoves(piece)) {
      this.ctx.beginPath();
      const enemyPiece = this.board.atLocation([row, col]);

      if (enemyPiece) {
        this.drawPiece(enemyPiece, "rgb(178, 34, 34)");
      }

      this.ctx.fillStyle = "rgb(66, 66, 67)";
      this.ctx.save();
      this.ctx.arc(
        col * tileSize + dotCenter,
        row * tileSize + dotCenter,
        13,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  highlightKing(color) {
    const king = this.board
      .getPieces(color)
      .find((piece) => piece.constructor.name === "King");
    this.drawPiece(king, "red");
  }
}

export default BoardDisplay;
