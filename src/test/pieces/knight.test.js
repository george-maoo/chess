const Board = require("../../board");
const Knight = require("../../pieces/knight");
const Pawn = require("../../pieces/pawn");
const helper = require("./helper");

describe("Knight", () => {
  // in expectedValidMoves, a 1 represents a valid move, a 0 represents invalid move
  describe("Knight movement", () => {
    test("Can do weird knight L shape movement in all 8 directions", () => {
      const board = new Board();
      board.setLocation(new Knight("white", [4, 4], board), [4, 4]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Can move over pieces", () => {
      const board = new Board();
      board.setLocation(new Knight("white", [4, 4], board), [4, 4]);

      // surround knight with mixture of black and white pawns
      board.setLocation(new Pawn("white", [3, 3], board), [3, 3]);
      board.setLocation(new Pawn("black", [3, 4], board), [3, 4]);
      board.setLocation(new Pawn("white", [3, 5], board), [3, 5]);
      board.setLocation(new Pawn("black", [4, 3], board), [4, 3]);
      board.setLocation(new Pawn("white", [4, 5], board), [4, 5]);
      board.setLocation(new Pawn("white", [5, 3], board), [5, 3]);
      board.setLocation(new Pawn("black", [5, 4], board), [5, 4]);
      board.setLocation(new Pawn("white", [5, 5], board), [5, 5]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Cannot move ontop of pieces of same color", () => {
      const board = new Board();
      board.setLocation(new Knight("white", [4, 4], board), [4, 4]);

      // surround knight with pawns
      board.setLocation(new Pawn("white", [2, 3], board), [2, 3]);
      board.setLocation(new Pawn("white", [5, 6], board), [5, 6]);
      board.setLocation(new Pawn("white", [6, 3], board), [6, 3]);
      board.setLocation(new Pawn("white", [3, 6], board), [3, 6]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Can move ontop of enemy pieces", () => {
      const board = new Board();
      board.setLocation(new Knight("white", [4, 4], board), [4, 4]);

      // surround knight with pawns
      board.setLocation(new Pawn("black", [2, 3], board), [2, 3]);
      board.setLocation(new Pawn("black", [5, 6], board), [5, 6]);
      board.setLocation(new Pawn("black", [6, 3], board), [6, 3]);
      board.setLocation(new Pawn("black", [3, 6], board), [3, 6]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });
  });
});
