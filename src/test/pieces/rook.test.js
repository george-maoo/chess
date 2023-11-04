const Rook = require("../../pieces/rook");
const Pawn = require("../../pieces/pawn");
const Board = require("../../board");
const helper = require("./helper");

describe("Rook", () => {
  describe("Rook movement", () => {
    test("Can move horizontally and vertically when placed in middle of empty board", () => {
      const board = new Board();
      board.placePiece(new Rook("white", [4, 4], board), [4, 4]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Can only move up and left when placed in row 7 column 7", () => {
      const board = new Board();
      board.placePiece(new Rook("white", [7, 7], board), [7, 7]);

      const validMoves = board.board[7][7].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Cant move on or over pieces of same color", () => {
      const board = new Board();
      board.placePiece(new Rook("white", [4, 4], board), [4, 4]);
      board.placePiece(new Pawn("white", [4, 6], board), [4, 6]);
      board.placePiece(new Pawn("white", [6, 4], board), [6, 4]);
      board.placePiece(new Pawn("white", [4, 1], board), [4, 1]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Can move on top of enemy pieces but not over them", () => {
      const board = new Board();
      board.placePiece(new Rook("white", [4, 4], board), [4, 4]);
      board.placePiece(new Pawn("black", [4, 6], board), [4, 6]);
      board.placePiece(new Pawn("black", [6, 4], board), [6, 4]);
      board.placePiece(new Pawn("black", [4, 1], board), [4, 1]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });
  });
});
