import Board from "../board.js";
import Pawn from "../pieces/pawn.js";
import Bishop from "../pieces/bishop.js";
import Rook from "../pieces/rook.js";
import Knight from "../pieces/knight.js";
import Queen from "../pieces/queen.js";
import King from "../pieces/king.js";

describe("Check and Checkmate", () => {
  describe("isInCheck", () => {
    describe("When king is in check", () => {
      test("in check from one piece", () => {
        const board = new Board();
        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("black", [6, 4], board), [6, 4]);

        expect(board.isInCheck("white")).toBe(true);
      });

      test("in check from multiple pieces", () => {
        const board = new Board();
        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Knight("black", [6, 5], board), [6, 5]);
        board.setLocation(new Bishop("black", [7, 1], board), [7, 1]);

        expect(board.isInCheck("white")).toBe(true);
      });

      test("Works for both colors", () => {
        const board = new Board();
        board.setLocation(new King("black", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("white", [6, 4], board), [6, 4]);

        expect(board.isInCheck("black")).toBe(true);
      });
    });

    describe("When king is not in check", () => {
      test("not in check", () => {
        const board = new Board();
        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("black", [6, 5], board), [6, 5]);

        expect(board.isInCheck("white")).toBe(false);
      });
    });
  });

  describe("isInCheckmate", () => {
    describe("When king is in checkmate", () => {
      test("Checkmate scenario 1", () => {
        const board = new Board();
        board.setLocation(new King("white", [0, 0], board), [0, 0]);
        board.setLocation(new Rook("black", [7, 0], board), [7, 0]);
        board.setLocation(new Rook("black", [7, 1], board), [7, 1]);

        expect(board.isInCheck("white")).toBe(true);

        expect(board.isInCheckmate("white")).toBe(true);
      });

      test("Checkmate scenario 2", () => {
        const board = new Board();
        board.setLocation(new King("white", [7, 6], board), [7, 6]);
        board.setLocation(new Pawn("white", [6, 5], board), [6, 5]);
        board.setLocation(new Pawn("white", [6, 6], board), [6, 6]);
        board.setLocation(new Pawn("white", [6, 7], board), [6, 7]);

        board.setLocation(new Queen("black", [7, 0], board), [7, 0]);

        expect(board.isInCheck("white")).toBe(true);

        expect(board.isInCheckmate("white")).toBe(true);
      });

      test("Checkmate scenario 3", () => {
        const board = new Board();
        board.setLocation(new King("black", [0, 6], board), [0, 6]);
        board.setLocation(new Pawn("black", [1, 5], board), [1, 5]);
        board.setLocation(new Pawn("black", [2, 6], board), [2, 6]);
        board.setLocation(new Pawn("black", [1, 7], board), [1, 7]);

        board.setLocation(new Queen("white", [1, 6], board), [1, 6]);
        board.setLocation(new Pawn("white", [2, 5], board), [2, 5]);

        expect(board.isInCheck("black")).toBe(true);

        expect(board.isInCheckmate("black")).toBe(true);
      });

      test("Checkmate scenario 4", () => {
        const board = new Board();
        board.setLocation(new King("white", [0, 2], board), [0, 2]);
        board.setLocation(new Rook("white", [0, 3], board), [0, 3]);
        board.setLocation(new Knight("white", [1, 3], board), [1, 3]);

        board.setLocation(new Bishop("black", [4, 5], board), [4, 5]);
        board.setLocation(new Bishop("black", [2, 0], board), [2, 0]);

        expect(board.isInCheck("white")).toBe(true);

        expect(board.isInCheckmate("white")).toBe(true);
      });
    });

    describe("When king is not in checkmate", () => {
      test("King is not in check", () => {
        const board = new Board();
        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("black", [0, 1], board), [0, 1]);

        expect(board.isInCheckmate("white")).toBe(false);
      });

      test("King can move out of check", () => {
        const board = new Board();
        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("black", [6, 4], board), [6, 4]);

        expect(board.isInCheckmate("white")).toBe(false);
      });

      test("Piece that is checking the king can be captured by king", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [3, 3], board), [3, 3]);
        board.setLocation(new Pawn("white", [3, 4], board), [3, 4]);
        board.setLocation(new Pawn("white", [3, 5], board), [3, 5]);
        board.setLocation(new Pawn("white", [4, 3], board), [4, 3]);
        board.setLocation(new Pawn("white", [4, 5], board), [4, 5]);
        board.setLocation(new Pawn("white", [5, 3], board), [5, 3]);
        board.setLocation(new Pawn("white", [5, 5], board), [5, 5]);

        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("black", [5, 4], board), [5, 4]);

        expect(board.isInCheckmate("white")).toBe(false);
      });

      test("Piece that is checking the king can be captured by another piece", () => {
        const board = new Board();
        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("black", [6, 4], board), [6, 4]);
        board.setLocation(new Rook("white", [6, 0], board), [6, 0]);

        expect(board.isInCheckmate("white")).toBe(false);
      });

      test("A piece can be moved between the threatening piece and king", () => {
        const board = new Board();
        board.setLocation(new King("white", [4, 4], board), [4, 4]);
        board.setLocation(new Queen("black", [7, 4], board), [7, 4]);
        board.setLocation(new Rook("white", [5, 0], board), [5, 0]);

        expect(board.isInCheckmate("white")).toBe(false);
      });
    });
  });
});
