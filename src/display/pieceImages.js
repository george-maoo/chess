class PieceImages {
  constructor() {
    this.pieceImages = {
      black: {
        Pawn: new Image(),
        Knight: new Image(),
        Bishop: new Image(),
        Rook: new Image(),
        Queen: new Image(),
        King: new Image(),
      },
      white: {
        Pawn: new Image(),
        Knight: new Image(),
        Bishop: new Image(),
        Rook: new Image(),
        Queen: new Image(),
        King: new Image(),
      },
    };

    this.pieceImages.white.Knight.src = "/src/img/pieces/wn.svg";
    this.pieceImages.white.Rook.src = "/src/img/pieces/wr.svg";
    this.pieceImages.white.Queen.src = "/src/img/pieces/wq.svg";
    this.pieceImages.white.Pawn.src = "/src/img/pieces/wp.svg";
    this.pieceImages.white.King.src = "/src/img/pieces/wk.svg";
    this.pieceImages.white.Bishop.src = "/src/img/pieces/wb.svg";

    this.pieceImages.black.Knight.src = "/src/img/pieces/bn.svg";
    this.pieceImages.black.Rook.src = "/src/img/pieces/br.svg";
    this.pieceImages.black.Queen.src = "/src/img/pieces/bq.svg";
    this.pieceImages.black.Pawn.src = "/src/img/pieces/bp.svg";
    this.pieceImages.black.King.src = "/src/img/pieces/bk.svg";
    this.pieceImages.black.Bishop.src = "/src/img/pieces/bb.svg";
  }

  getPieceImage(piece) {
    const pieceType = piece.constructor.name;
    return this.pieceImages[piece.color][pieceType];
  }
}

export default PieceImages;
