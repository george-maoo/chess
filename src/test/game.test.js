import Board from "./../board.js";
import Game from "./../game.js";

describe("Game", () => {
  describe("4 move checkmate", () => {
    test("White wins", () => {
      const whiteMoves = [
        { startPos: [6, 4], endPos: [4, 4] },
        { startPos: [7, 5], endPos: [4, 2] },
        { startPos: [7, 3], endPos: [3, 7] },
        { startPos: [3, 7], endPos: [1, 5] },
      ];
      const blackMoves = [
        { startPos: [1, 4], endPos: [3, 4] },
        { startPos: [0, 1], endPos: [2, 0] },
        { startPos: [1, 1], endPos: [2, 1] },
      ];

      const board = new Board();
      board.initializeBoard();

      const game = new Game(board);

      game.attemptMove(whiteMoves[0]);
      game.attemptMove(blackMoves[0]);

      game.attemptMove(whiteMoves[1]);
      game.attemptMove(blackMoves[1]);

      game.attemptMove(whiteMoves[2]);
      game.attemptMove(blackMoves[2]);

      expect(game.attemptMove(whiteMoves[3])).toBe("white");
    });
  });
});
