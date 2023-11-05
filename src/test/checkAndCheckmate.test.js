const Board = require("../board");
const Pawn = require("../pieces/pawn");
const Bishop = require("../pieces/bishop");
const Rook = require("../pieces/rook");
const Knight = require("../pieces/knight");
const Queen = require("../pieces/queen");
const King = require("../pieces/king");

describe("Check and Checkmate", () => {
  describe("isInCheck", () => {
    describe("When king is in check", () => {
      test("in check from one piece", () => {
        const board = new Board();
        board.placePiece(new King("white", [4, 4], board), [4, 4]);
        board.placePiece(new Queen("black", [6, 4], board), [6, 4]);

        expect(board.isInCheck("white")).toBe(true);
      });

      test("in check from multiple pieces", () => {
        const board = new Board();
        board.placePiece(new King("white", [4, 4], board), [4, 4]);
        board.placePiece(new Knight("black", [6, 5], board), [6, 5]);
        board.placePiece(new Bishop("black", [7, 1], board), [7, 1]);

        expect(board.isInCheck("white")).toBe(true);
      });
    });

    describe("When king is not in check", () => {
      test("not in check", () => {
        const board = new Board();
        board.placePiece(new King("white", [4, 4], board), [4, 4]);
        board.placePiece(new Queen("black", [6, 5], board), [6, 5]);

        expect(board.isInCheck("white")).toBe(false);
      });
    });
  });

  describe("isInCheckmate", () => {
    describe("When king is in checkmate", () => {});

    describe("When king is not in checkmate", () => {});
  });
});
