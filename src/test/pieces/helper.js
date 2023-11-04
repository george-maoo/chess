const printBoard = (board) => {
  let x = "";
  board.forEach((row) => {
    row.forEach((col) => (col === 1 ? (x += "X ") : (x += "  ")));
    x += "\n";
  });

  console.log(x);
};

// validates the list of moves returned by Piece.validMoves
const validMoveValidator = (expectedValidMoves, validMoves, debug = false) => {
  const generatedValidMoves = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  validMoves.forEach(([r, c]) => (generatedValidMoves[r][c] = 1));

  if (debug) {
    console.log("GENERATED");
    printBoard(generatedValidMoves);
    console.log("EXPECTED");
    printBoard(expectedValidMoves);
  }

  // compare the user expected valid moves with the valid moves generated by Piece.validMoves
  return (
    JSON.stringify(expectedValidMoves) === JSON.stringify(generatedValidMoves)
  );
};

module.exports = {
  validMoveValidator,
};
