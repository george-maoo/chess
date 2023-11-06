import King from "./../../pieces/king.js";
import Pawn from "./../../pieces/pawn.js";
import Board from "./../../board.js";
import { validMoveValidator } from "./helper.js";

describe("King", () => {
  describe("King movement", () => {
    test("Can move horizontally, vertically, and diagonally 1 tile placed in middle of empty board", () => {
      const board = new Board();
      board.setLocation(new King("white", [4, 4], board), [4, 4]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(true);
    });

    test("Can only move up, right, and diagonally 1 tile placed in row 7, column 0", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 0], board), [7, 0]);

      const validMoves = board.board[7][0].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0],
      ];

      expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(true);
    });

    test("Cannot move on pieces of same color", () => {
      const board = new Board();
      board.setLocation(new King("white", [4, 4], board), [4, 4]);

      board.setLocation(new Pawn("white", [3, 3], board), [3, 3]);
      board.setLocation(new Pawn("white", [3, 5], board), [3, 5]);
      board.setLocation(new Pawn("white", [4, 5], board), [4, 5]);
      board.setLocation(new Pawn("white", [5, 5], board), [5, 5]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(true);
    });

    test("Can move on enemy pieces", () => {
      const board = new Board();
      board.setLocation(new King("white", [4, 4], board), [4, 4]);

      board.setLocation(new Pawn("black", [4, 3], board), [4, 3]);
      board.setLocation(new Pawn("black", [4, 5], board), [4, 5]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(true);
    });
  });
});
