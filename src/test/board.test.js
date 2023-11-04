const Board = require("../board");
const Pawn = require("../pieces/pawn");
const Bishop = require("../pieces/bishop");
const Rook = require("../pieces/rook");
const Knight = require("../pieces/knight");
const Queen = require("../pieces/queen");
const King = require("../pieces/king");

describe("Board", () => {
  describe("initialization", () => {
    test("Board is initially empty", () => {
      const board = new Board();

      expect(board.board).toEqual([
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ]);
    });
  });

  describe("placePiece", () => {
    test("Can place items in board", () => {
      const board = new Board();
      const p = new Pawn("white", [3, 4]);
      board.placePiece(p, [3, 4]);

      expect(board.board[3][4]).toBe(p);
    });
  });

  describe("isInBounds", () => {
    const board = new Board();

    test("Returns false when location given is out of bounds", () => {
      expect(board.isInBounds([8, 8])).toBe(false);
      expect(board.isInBounds([100, 100])).toBe(false);
    });

    test("Returns true when location given is in bounds", () => {
      expect(board.isInBounds([0, 0])).toBe(true);
      expect(board.isInBounds([7, 0])).toBe(true);
      expect(board.isInBounds([5, 5])).toBe(true);
    });
  });

  describe("isPosEmpty", () => {
    const board = new Board();

    test("Returns false when location given is out of bounds", () => {
      expect(board.isPosEmpty([8, 8])).toBe(false);
      expect(board.isPosEmpty([100, 100])).toBe(false);
    });

    test("Returns true when position is empty", () => {
      expect(board.isPosEmpty([6, 6])).toBe(true);
      expect(board.isPosEmpty([4, 3])).toBe(true);
      expect(board.isPosEmpty([2, 7])).toBe(true);
    });

    test("Returns false when position is not empty", () => {
      board.placePiece(new Pawn("white", [6, 6], board), [6, 6]);
      expect(board.isPosEmpty([6, 6])).toBe(false);
    });
  });
});
