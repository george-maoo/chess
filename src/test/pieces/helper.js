const printBoard = (board) => {
  let boardStr = "";
  board.board.forEach((row) => {
    boardStr += "-".repeat(15) + "\n";
    row.forEach((pos) => {
      boardStr += `${pos === null ? " " : pos.pieceSymbol()} `;
    });
    boardStr += "\n";
  });
  console.log(boardStr);
};

const printMoves = (board) => {
  let x = "";
  board.forEach((row) => {
    row.forEach((col) => (col === 1 ? (x += "X ") : (x += "  ")));
    x += "\n";
  });

  console.log(x);
};

// validates the list of moves returned by Piece.possibleMoves
const possibleMovesValidator = (
  expectedPossibleMoves,
  possibleMoves,
  debug = false
) => {
  const generatedPossibleMoves = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  possibleMoves.forEach(([r, c]) => (generatedPossibleMoves[r][c] = 1));

  if (debug) {
    console.log("GENERATED");
    printMoves(generatedPossibleMoves);
    console.log("EXPECTED");
    printMoves(expectedPossibleMoves);
  }

  // compare the user expected valid moves with the valid moves generated by Piece.possibleMoves
  return (
    JSON.stringify(expectedPossibleMoves) ===
    JSON.stringify(generatedPossibleMoves)
  );
};

export { possibleMovesValidator, printBoard };
