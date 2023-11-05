(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Pawn = require("./pieces/pawn");
const Bishop = require("./pieces/bishop");
const Rook = require("./pieces/rook");
const Knight = require("./pieces/knight");
const Queen = require("./pieces/queen");
const King = require("./pieces/king");

// the board to play on
class Board {
  constructor() {
    // TODO find a better way to initialize board
    this.board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    this.undoStack = [];
  }

  // displays the board on the terminal, will be removed when I set up a actual UI
  printBoard() {
    let board = "";
    this.board.forEach((row) => {
      row.forEach((pos) => {
        board += `${pos === null ? " " : pos.stringRep()} `;
      });
      board += "\n";
    });
    console.log(board);
  }

  // initialize board
  initializeBoard() {
    this.setLocation(new Rook("black", [0, 0], this), [0, 0]);
    this.setLocation(new Knight("black", [0, 1], this), [0, 1]);
    this.setLocation(new Bishop("black", [0, 2], this), [0, 2]);
    this.setLocation(new Queen("black", [0, 3], this), [0, 3]);
    this.setLocation(new King("black", [0, 4], this), [0, 4]);
    this.setLocation(new Bishop("black", [0, 5], this), [0, 5]);
    this.setLocation(new Knight("black", [0, 6], this), [0, 6]);
    this.setLocation(new Rook("black", [0, 7], this), [0, 7]);
    for (let i = 0; i < 8; i++) {
      this.setLocation(new Pawn("black", [1, i], this), [1, i]);
    }

    this.setLocation(new Rook("white", [7, 0], this), [7, 0]);
    this.setLocation(new Knight("white", [7, 1], this), [7, 1]);
    this.setLocation(new Bishop("white", [7, 2], this), [7, 2]);
    this.setLocation(new Queen("white", [7, 3], this), [7, 3]);
    this.setLocation(new King("white", [7, 4], this), [7, 4]);
    this.setLocation(new Bishop("white", [7, 5], this), [7, 5]);
    this.setLocation(new Knight("white", [7, 6], this), [7, 6]);
    this.setLocation(new Rook("white", [7, 7], this), [7, 7]);
    for (let i = 0; i < 8; i++) {
      this.setLocation(new Pawn("white", [6, i], this), [6, i]);
    }
  }

  // getter
  atLocation([row, col]) {
    return this.board[row][col];
  }

  // setter
  setLocation(piece, [row, col]) {
    this.board[row][col] = piece;
  }

  // gets all pieces of a specified color, or all pieces if no color is specified
  getPieces(color = "all") {
    const pieces = this.board.flat(1);
    if (color === "all") {
      return pieces.filter((piece) => piece !== null);
    } else {
      return pieces.filter((piece) => piece !== null && piece.color === color);
    }
  }

  // checks if move is included in listOfMoves, returns true if included, false if not
  includesMove(listOfMoves, endPos) {
    return listOfMoves.some(
      (move) => move[0] === endPos[0] && move[1] === endPos[1]
    );
  }

  // moves the piece from the start pos to end pos
  // returns true if piece is moved, returns false if end position is invalid
  movePiece(startPos, endPos) {
    // check if given start pos is in bounds before doing anything
    if (!this.isInBounds(startPos)) return false;

    // check if piece exists
    // check if end position is included in the valid moves of the piece
    const piece = this.atLocation(startPos);

    if (!piece || !this.includesMove(piece.validMoves(), endPos)) {
      return false;
    }

    this.undoStack.push({
      oldPos: startPos,
      newPos: endPos,
      atOldPos: this.atLocation(startPos),
      atNewPos: this.atLocation(endPos),
    });

    this.setLocation(this.atLocation(startPos), endPos);
    this.setLocation(null, startPos);

    this.atLocation(endPos).location = endPos;
    return true;
  }

  undoLastMove() {
    const lastMove = this.undoStack.pop();
    this.setLocation(lastMove.atOldPos, lastMove.oldPos);
    lastMove.atOldPos.location = lastMove.oldPos;

    if (lastMove.atNewPos === null) {
      this.setLocation(null, lastMove.newPos);
    } else {
      this.setLocation(lastMove.atNewPos, lastMove.newPos);
      lastMove.atNewPos.location = lastMove.newPos;
    }
  }

  // checks if piece is in bounds
  isInBounds([row, col]) {
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[0].length
    );
  }

  isPosEmpty(posToCheck) {
    return this.isInBounds(posToCheck) && this.atLocation(posToCheck) === null;
  }

  // find the king with the color passed in - DONE
  // check all enemy moves to see if the king gets hit by any of them - DONE
  // return true if in check, false if not
  isInCheck(color) {
    const king = this.getPieces(color).find((piece) => piece instanceof King);
    const enemyColor = color === "black" ? "white" : "black";

    for (const enemyPiece of this.getPieces(enemyColor)) {
      if (this.includesMove(enemyPiece.validMoves(), king.location)) {
        return true;
      }
    }

    return false;
  }

  // checks that a move doesnt put king in check
  moveIsSafe(color, piece, move) {
    this.movePiece(piece.location, move);
    const safe = !this.isInCheck(color);
    this.undoLastMove();

    return safe;
  }

  /*
  first check if player is in check
  check all moves that the player in check can make
  if none of those moves move them out of checkmate, return true, else return false
   */
  isInCheckmate(color) {
    if (!this.isInCheck(color)) return false;

    for (const piece of this.getPieces(color)) {
      for (const move of piece.validMoves()) {
        if (this.moveIsSafe(color, piece, move)) {
          return false;
        }
      }
    }

    return true;
  }
}

module.exports = Board;

},{"./pieces/bishop":4,"./pieces/king":5,"./pieces/knight":6,"./pieces/pawn":7,"./pieces/queen":9,"./pieces/rook":10}],2:[function(require,module,exports){
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

module.exports = Game;

},{}],3:[function(require,module,exports){
const Board = require("./board");
const Game = require("./game");
const Pawn = require("./pieces/pawn");
const King = require("./pieces/king");
const Queen = require("./pieces/queen");
const Knight = require("./pieces/knight");
const Rook = require("./pieces/rook");
const Bishop = require("./pieces/bishop");

const board = new Board();
board.initializeBoard();

const game = new Game(board);

const root = document.getElementById("root");

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "my-canvas");
canvas.setAttribute("height", 648);
canvas.setAttribute("width", 640);

const ctx = canvas.getContext("2d");
root.appendChild(canvas);

const boardDisplay = document.createElement("div");
boardDisplay.setAttribute("id", "chess-board");

let count = 0;
x = [];

const gamePlayFunc = (loc) => {
  if (count === 0) {
    if (board.atLocation(loc) === null) return;
    count += 1;
    x.push(loc);
  } else {
    const startPos = x.pop();
    if (board.movePiece(startPos, loc)) {
      renderBoard();
    }
    console.log(board.isInCheckmate("black"));
    count -= 1;
  }
};

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const button = document.createElement("button");

    button.setAttribute("id", "board-tile");
    button.pos = [i, j];
    button.addEventListener("click", () => gamePlayFunc(button.pos));
    boardDisplay.appendChild(button);
  }
}

const renderBoard = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle =
        (i + j) % 2 === 1 ? "rgb(184,139,74)" : "rgb(227,193,111)";
      ctx.fillRect(i * 80, j * 81, 80, 81);

      const loc = board.atLocation([i, j]);
      if (loc !== null) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 80 * j, 81 * i, 80, 81);
        };
        img.src = `./../src/${loc.imgRep()}.svg`;
      }
    }
  }
};

renderBoard();

root.appendChild(boardDisplay);

},{"./board":1,"./game":2,"./pieces/bishop":4,"./pieces/king":5,"./pieces/knight":6,"./pieces/pawn":7,"./pieces/queen":9,"./pieces/rook":10}],4:[function(require,module,exports){
const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Bishop extends Piece {
  stringRep() {
    return this.color === "black" ? "♝" : "♗";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bb" : "img/pieces/wb";
  }

  moveDirections() {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
  }

  validMoves() {
    return moveType.multiMove(this);
  }
}

module.exports = Bishop;

},{"./piece":8,"./utils/movetype":11}],5:[function(require,module,exports){
const Piece = require("./piece");
const moveType = require("./utils/movetype");

class King extends Piece {
  stringRep() {
    return this.color === "black" ? "♚" : "♔";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bk" : "img/pieces/wk";
  }

  moveDirections() {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
  }

  validMoves() {
    return moveType.singleMove(this);
  }
}

module.exports = King;

},{"./piece":8,"./utils/movetype":11}],6:[function(require,module,exports){
const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Knight extends Piece {
  stringRep() {
    return this.color === "black" ? "♞" : "♘";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bn" : "img/pieces/wn";
  }

  moveDirections() {
    return [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [-1, -2],
    ];
  }

  validMoves() {
    return moveType.singleMove(this);
  }
}

module.exports = Knight;

},{"./piece":8,"./utils/movetype":11}],7:[function(require,module,exports){
const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Pawn extends Piece {
  stringRep() {
    return this.color === "black" ? "♟" : "♙";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bp" : "img/pieces/wp";
  }

  // assume black always starts at top of board
  forwardDirection() {
    return this.color === "black" ? 1 : -1;
  }

  isAtStart() {
    const row = this.location[0];
    return (
      (this.color === "white" && row === 6) ||
      (this.color === "black" && row === 1)
    );
  }

  validMoves() {
    return moveType.pawnMove(this);
  }
}

module.exports = Pawn;

},{"./piece":8,"./utils/movetype":11}],8:[function(require,module,exports){
class Piece {
  constructor(color, location, board) {
    this.color = color;
    this.location = location;
    this.board = board;
  }
}

module.exports = Piece;

},{}],9:[function(require,module,exports){
const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Queen extends Piece {
  stringRep() {
    return this.color === "black" ? "♛" : "♕";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/bq" : "img/pieces/wq";
  }

  moveDirections() {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
  }

  validMoves() {
    return moveType.multiMove(this);
  }
}

module.exports = Queen;

},{"./piece":8,"./utils/movetype":11}],10:[function(require,module,exports){
const Piece = require("./piece");
const moveType = require("./utils/movetype");

class Rook extends Piece {
  stringRep() {
    return this.color === "black" ? "♜" : "♖";
  }

  imgRep() {
    return this.color === "black" ? "img/pieces/br" : "img/pieces/wr";
  }

  moveDirections() {
    return [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
  }

  validMoves() {
    return moveType.multiMove(this);
  }
}

module.exports = Rook;

},{"./piece":8,"./utils/movetype":11}],11:[function(require,module,exports){
// for all pieces that can move multiple tiles:
/*
for every move in validMoves, check every possible move in that direction
until you hit:
  - another piece
    - if piece is same color:
      - dont add the position as a valid move
    - if piece is a enemy:
      - add the enemy piece's location as a valid move
  - move goes out of bounds
*/

const multiMove = (piece) => {
  const { board } = piece;
  const moves = [];

  piece.moveDirections().forEach(([rowDir, colDir]) => {
    let [rowToCheck, colToCheck] = piece.location;

    while (true) {
      rowToCheck += rowDir;
      colToCheck += colDir;
      const posToCheck = [rowToCheck, colToCheck];

      if (!board.isInBounds(posToCheck)) break;

      if (board.atLocation(posToCheck) === null) {
        moves.push(posToCheck);
      } else {
        if (board.atLocation(posToCheck).color !== piece.color) {
          moves.push(posToCheck);
        }
        break;
      }
    }
  });

  return moves;
};

// same as the above, but singleMove will only check the move direction once instead of looping
const singleMove = (piece) => {
  const { board } = piece;
  const moves = [];

  piece.moveDirections().forEach(([rowDir, colDir]) => {
    let [rowToCheck, colToCheck] = piece.location;

    rowToCheck += rowDir;
    colToCheck += colDir;
    const posToCheck = [rowToCheck, colToCheck];

    if (!board.isInBounds(posToCheck)) return;

    if (board.atLocation(posToCheck) === null) {
      moves.push(posToCheck);
    } else {
      if (board.atLocation(posToCheck).color !== piece.color) {
        moves.push(posToCheck);
      }
    }
  });

  return moves;
};

/*
for pawn movement:
allow up to 2 steps forward if at starting position
allow 1 step if not at starting position
allow capturing pieces if there is a enemy piece at the forward diagonal directions of pawn
 */
const pawnMove = (piece) => {
  const { board } = piece;
  const forwardDir = piece.forwardDirection();
  const [currentRow, currentCol] = piece.location;
  const moves = [];

  const oneStep = [currentRow + forwardDir, currentCol];
  const twoStep = [currentRow + forwardDir * 2, currentCol];

  if (board.isPosEmpty(oneStep)) {
    moves.push(oneStep);
  }

  if (
    board.isPosEmpty(oneStep) &&
    board.isPosEmpty(twoStep) &&
    piece.isAtStart()
  ) {
    moves.push(twoStep);
  }

  const leftDiag = [currentRow + forwardDir, currentCol - 1];
  if (
    board.isInBounds(leftDiag) &&
    board.atLocation(leftDiag) !== null &&
    board.atLocation(leftDiag).color !== piece.color
  ) {
    moves.push(leftDiag);
  }

  const rightDiag = [currentRow + forwardDir, currentCol + 1];
  if (
    board.isInBounds(rightDiag) &&
    board.atLocation(rightDiag) !== null &&
    board.atLocation(rightDiag).color !== piece.color
  ) {
    moves.push(rightDiag);
  }

  return moves;
};

module.exports = {
  multiMove,
  singleMove,
  pawnMove,
};

},{}]},{},[3]);
