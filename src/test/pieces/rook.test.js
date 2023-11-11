import Rook from "../../pieces/rook.js";
import Pawn from "../../pieces/pawn.js";
import Board from "../../board.js";
import { possibleMovesValidator } from "./helper.js";

describe("Rook", () => {
  // in expectedPossibleMoves, a 1 represents a valid move, a 0 represents invalid move
  describe("Rook movement", () => {
    test("Can move horizontally and vertically when placed in middle of empty board", () => {
      const board = new Board();
      board.setLocation(new Rook("white", [4, 4], board), [4, 4]);

      const possibleMoves = board.atLocation([4, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
        true
      );
    });

    test("Can only move up and left when placed in row 7 column 7", () => {
      const board = new Board();
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);

      const possibleMoves = board.atLocation([7, 7]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
        true
      );
    });

    test("Cant move on or over pieces of same color", () => {
      const board = new Board();
      board.setLocation(new Rook("white", [4, 4], board), [4, 4]);
      board.setLocation(new Pawn("white", [4, 6], board), [4, 6]);
      board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);
      board.setLocation(new Pawn("white", [4, 1], board), [4, 1]);

      const possibleMoves = board.atLocation([4, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
        true
      );
    });

    test("Can move on top of enemy pieces but not over them", () => {
      const board = new Board();
      board.setLocation(new Rook("white", [4, 4], board), [4, 4]);
      board.setLocation(new Pawn("black", [4, 6], board), [4, 6]);
      board.setLocation(new Pawn("black", [6, 4], board), [6, 4]);
      board.setLocation(new Pawn("black", [4, 1], board), [4, 1]);

      const possibleMoves = board.atLocation([4, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
        true
      );
    });
  });
});
