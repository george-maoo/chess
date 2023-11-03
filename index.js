const Board = require("./src/board.js");

const b = new Board();
b.placePiece("A", [1, 1]);
console.log(b.board);
console.log(b.isInBounds([8, 8]));
console.log(b.isInBounds([1, 1]));
