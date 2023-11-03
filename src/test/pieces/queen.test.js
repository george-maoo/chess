const Queen = require("../../pieces/queen");
const Board = require("../../board");
const helper = require("./helper");

describe("Queen", () => {
  describe("Queen movement", () => {
    test("Queen can move up, down, and diagonally when placed in middle of empty board", () => {
      const board = new Board();
      board.placePiece(new Queen("white", [4, 4], board), [4, 4]);
      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 1],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });
  });
});
