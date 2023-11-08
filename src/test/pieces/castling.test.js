import { possibleMovesValidator } from "./helper.js";
import Board from "../../board.js";
import King from "../../pieces/king.js";
import Rook from "../../pieces/rook.js";

describe("Castling", () => {
  describe("White", () => {
    test("Castling shows up in list of possible moves", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);
      board.setLocation(new Rook("white", [7, 0], board), [7, 0]);

      const possibleMoves = board.atLocation([7, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
        true
      );
    });

    test("Castling works properly with left rook", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 0], board), [7, 0]);

      board.movePiece([7, 4], [7, 2]);

      expect(board.atLocation([7, 2]).constructor.name).toBe("King");
      expect(board.atLocation([7, 3]).constructor.name).toBe("Rook");
    });

    test("Castling works properly with right rook", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);

      board.movePiece([7, 4], [7, 6]);

      expect(board.atLocation([7, 6]).constructor.name).toBe("King");
      expect(board.atLocation([7, 5]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if rook has moved", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);

      board.movePiece([7, 7], [6, 7]);
      board.movePiece([6, 7], [7, 7]);

      // this move should fail
      board.movePiece([7, 4], [7, 6]);

      expect(board.atLocation([7, 4]).constructor.name).toBe("King");
      expect(board.atLocation([7, 7]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if king has moved", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);

      board.movePiece([7, 4], [7, 5]);
      board.movePiece([7, 5], [7, 4]);

      // this move should fail
      board.movePiece([7, 4], [7, 6]);

      expect(board.atLocation([7, 4]).constructor.name).toBe("King");
      expect(board.atLocation([7, 7]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if king is in check", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);

      board.setLocation(new Rook("black", [0, 4], board), [0, 4]);

      // this move should fail
      board.movePiece([7, 4], [7, 6]);

      expect(board.atLocation([7, 4]).constructor.name).toBe("King");
      expect(board.atLocation([7, 7]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if king has to pass through a square that is attacked by an enemy piece", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);

      board.setLocation(new Rook("black", [0, 5], board), [0, 5]);

      // this move should fail
      board.movePiece([7, 4], [7, 6]);

      expect(board.atLocation([7, 4]).constructor.name).toBe("King");
      expect(board.atLocation([7, 7]).constructor.name).toBe("Rook");
    });

    test("Player cant put himself into check by castling", () => {
      const board = new Board();
      board.setLocation(new King("white", [7, 4], board), [7, 4]);
      board.setLocation(new Rook("white", [7, 7], board), [7, 7]);

      board.setLocation(new Rook("black", [0, 6], board), [0, 6]);

      // this move should fail
      board.movePiece([7, 4], [7, 6]);

      expect(board.atLocation([7, 4]).constructor.name).toBe("King");
      expect(board.atLocation([7, 7]).constructor.name).toBe("Rook");
    });
  });

  describe("Black", () => {
    test("Castling shows up in list of possible moves", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 7], board), [0, 7]);
      board.setLocation(new Rook("black", [0, 0], board), [0, 0]);

      const possibleMoves = board.atLocation([0, 4]).possibleMoves();
      const expectedPossibleMoves = [
        [0, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

      expect(possibleMovesValidator(expectedPossibleMoves, possibleMoves)).toBe(
        true
      );
    });

    test("Castling works properly with left rook", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 0], board), [0, 0]);

      board.movePiece([0, 4], [0, 2]);

      expect(board.atLocation([0, 2]).constructor.name).toBe("King");
      expect(board.atLocation([0, 3]).constructor.name).toBe("Rook");
    });

    test("Castling works properly with right rook", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 7], board), [0, 7]);

      board.movePiece([0, 4], [0, 6]);

      expect(board.atLocation([0, 6]).constructor.name).toBe("King");
      expect(board.atLocation([0, 5]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if rook has moved", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 7], board), [0, 7]);

      board.movePiece([0, 7], [1, 7]);
      board.movePiece([1, 7], [0, 7]);

      // this move should fail
      board.movePiece([0, 4], [0, 6]);

      expect(board.atLocation([0, 4]).constructor.name).toBe("King");
      expect(board.atLocation([0, 7]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if king has moved", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 7], board), [0, 7]);

      board.movePiece([0, 4], [0, 5]);
      board.movePiece([0, 5], [0, 4]);

      // this move should fail
      board.movePiece([0, 4], [0, 6]);

      expect(board.atLocation([0, 4]).constructor.name).toBe("King");
      expect(board.atLocation([0, 7]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if king is in check", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 7], board), [0, 7]);

      board.setLocation(new Rook("white", [7, 4], board), [7, 4]);

      // this move should fail
      board.movePiece([0, 4], [0, 6]);

      expect(board.atLocation([0, 4]).constructor.name).toBe("King");
      expect(board.atLocation([0, 7]).constructor.name).toBe("Rook");
    });

    test("Castling isnt allowed if king has to pass through a square that is attacked by an enemy piece", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 7], board), [0, 7]);

      board.setLocation(new Rook("white", [7, 5], board), [7, 5]);

      // this move should fail
      board.movePiece([0, 4], [0, 6]);

      expect(board.atLocation([0, 4]).constructor.name).toBe("King");
      expect(board.atLocation([0, 7]).constructor.name).toBe("Rook");
    });

    test("Player cant put himself into check by castling", () => {
      const board = new Board();
      board.setLocation(new King("black", [0, 4], board), [0, 4]);
      board.setLocation(new Rook("black", [0, 7], board), [0, 7]);

      board.setLocation(new Rook("white", [7, 6], board), [7, 6]);

      // this move should fail
      board.movePiece([0, 4], [0, 6]);

      expect(board.atLocation([0, 4]).constructor.name).toBe("King");
      expect(board.atLocation([0, 7]).constructor.name).toBe("Rook");
    });
  });
});
