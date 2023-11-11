import Board from "../../board.js";
import Knight from "../../pieces/knight.js";
import Pawn from "../../pieces/pawn.js";
import { possibleMovesValidator } from "./helper.js";

describe("Knight", () => {
  // in expectedPossibleMoves, a 1 represents a valid move, a 0 represents invalid move
  describe("Knight movement", () => {
    test("Can do weird knight L shape movement in all 8 directions", () => {
      const board = new Board();
      board.setLocation(new Knight("white", [4, 4], board), [4, 4]);

      const possibleMoves = board.atLocation([4, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
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

      const possibleMoves = board.atLocation([4, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
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

      const possibleMoves = board.atLocation([4, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
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

      const possibleMoves = board.atLocation([4, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
        true
      );
    });
  });
});
