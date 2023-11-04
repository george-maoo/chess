const Queen = require("../../pieces/queen");
const Pawn = require("../../pieces/pawn");
const Board = require("../../board");
const helper = require("./helper");

// in expectedValidMoves, a 1 represents a valid move, a 0 represents invalid move
describe("Queen", () => {
  describe("Queen movement", () => {
    test("Can move up, down, and diagonally when placed in middle of empty board", () => {
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

    test("Can only move right, down, and diagonally when placed at row 0, column 0", () => {
      const board = new Board();
      board.placePiece(new Queen("white", [0, 0], board), [0, 0]);

      const validMoves = board.board[0][0].validMoves();
      const expectedValidMoves = [
        [0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Cant move over other pieces or on piece with same color", () => {
      const board = new Board();
      board.placePiece(new Queen("white", [4, 4], board), [4, 4]);

      board.placePiece(new Pawn("white", [5, 5], board), [5, 5]);
      board.placePiece(new Pawn("white", [2, 2], board), [2, 2]);
      board.placePiece(new Pawn("white", [4, 6], board), [4, 6]);
      board.placePiece(new Pawn("white", [7, 1], board), [7, 1]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });

    test("Should be able to move on top of enemy pieces but not over them", () => {
      const board = new Board();
      board.placePiece(new Queen("white", [4, 4], board), [4, 4]);

      board.placePiece(new Pawn("black", [4, 2], board), [4, 2]);
      board.placePiece(new Pawn("black", [6, 6], board), [6, 6]);
      board.placePiece(new Pawn("black", [5, 3], board), [5, 3]);

      const validMoves = board.board[4][4].validMoves();
      const expectedValidMoves = [
        [1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
      ];

      expect(helper.validMoveValidator(expectedValidMoves, validMoves)).toBe(
        true
      );
    });
  });
});
