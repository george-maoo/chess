const Pawn = require("./../../pieces/pawn");
const Board = require("./../../board");
const helper = require("./helper");

describe("Pawn", () => {
  // in expectedValidMoves, a 1 represents a valid move, a 0 represents invalid move
  describe("Pawn movement", () => {
    describe("White pawn", () => {
      test("Can move 2 units up when at starting position", () => {
        const board = new Board();
        board.placePiece(new Pawn("white", [6, 4], board), [6, 4]);

        const validMoves = board.board[6][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });
    });
  });
});
