import Pawn from "./../../pieces/pawn.js";
import Board from "./../../board.js";
import { validMoveValidator } from "./helper.js";;

describe("Pawn", () => {
  // in expectedValidMoves, a 1 represents a valid move, a 0 represents invalid move
  describe("Pawn movement", () => {
    describe("White pawn", () => {
      test("Can move up to 2 rows up when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

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

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Can move 1 row up when not at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [4, 4], board), [4, 4]);

        const validMoves = board.board[4][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Can capture pieces diagonally", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [4, 4], board), [4, 4]);

        board.setLocation(new Pawn("black", [3, 3], board), [3, 3]);
        board.setLocation(new Pawn("black", [3, 5], board), [3, 5]);

        const validMoves = board.board[4][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Can capture pieces diagonally and move 2 rows up when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

        board.setLocation(new Pawn("black", [5, 3], board), [5, 3]);
        board.setLocation(new Pawn("black", [5, 5], board), [5, 5]);

        const validMoves = board.board[6][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Cant move over pieces", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

        board.setLocation(new Pawn("black", [5, 4], board), [5, 4]);

        const validMoves = board.board[6][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Cant move 2 steps if there is a piece at that position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

        board.setLocation(new Pawn("black", [4, 4], board), [4, 4]);

        const validMoves = board.board[6][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });
    });

    describe("Black pawn", () => {
      test("Can move up to 2 rows down when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        const validMoves = board.board[1][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Can move 1 row down when not at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [4, 4], board), [4, 4]);

        const validMoves = board.board[4][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Can capture pieces diagonally", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [2, 4], board), [2, 4]);

        board.setLocation(new Pawn("white", [3, 3], board), [3, 3]);
        board.setLocation(new Pawn("white", [3, 5], board), [3, 5]);

        const validMoves = board.board[2][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Can capture pieces diagonally and move 2 rows up when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        board.setLocation(new Pawn("white", [2, 3], board), [2, 3]);
        board.setLocation(new Pawn("white", [2, 5], board), [2, 5]);

        const validMoves = board.board[1][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Cant move over pieces", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        board.setLocation(new Pawn("white", [2, 4], board), [2, 4]);

        const validMoves = board.board[1][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });

      test("Cant move 2 steps if there is a piece at that position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        board.setLocation(new Pawn("white", [3, 4], board), [3, 4]);

        const validMoves = board.board[1][4].validMoves();
        const expectedValidMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(validMoveValidator(expectedValidMoves, validMoves)).toBe(
          true
        );
      });
    });
  });
});
