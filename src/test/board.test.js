const Board = require("../board.js");

describe("placePiece", () => {
  test("Can place items in board", () => {
    const b = new Board();
    b.placePiece("P", [3, 4]);

    expect(b.board[3][4]).toBe("P");
  });
});

describe("isInBounds", () => {
  const b = new Board();

  test("Returns false when location given is out of bounds", () => {
    expect(b.isInBounds([8, 8])).toBe(false);
    expect(b.isInBounds([100, 100])).toBe(false);
  });

  test("Returns true when location given is in bounds", () => {
    expect(b.isInBounds([0, 0])).toBe(true);
    expect(b.isInBounds([7, 0])).toBe(true);
    expect(b.isInBounds([5, 5])).toBe(true);
  });
});
