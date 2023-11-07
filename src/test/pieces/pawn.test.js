import Pawn from "./../../pieces/pawn.js";
import Board from "./../../board.js";
import { possibleMovesValidator, printBoard } from "./helper.js";
import Queen from "../../pieces/queen.js";

describe("Pawn", () => {
  // in expectedPossibleMoves, a 1 represents a valid move, a 0 represents invalid move
  describe("Pawn movement", () => {
    describe("White pawn", () => {
      test("Can move up to 2 rows up when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

        const possibleMoves = board.board[6][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Can move 1 row up when not at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [4, 4], board), [4, 4]);

        const possibleMoves = board.board[4][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Can capture pieces diagonally", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [4, 4], board), [4, 4]);

        board.setLocation(new Pawn("black", [3, 3], board), [3, 3]);
        board.setLocation(new Pawn("black", [3, 5], board), [3, 5]);

        const possibleMoves = board.board[4][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Can capture pieces diagonally and move 2 rows up when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

        board.setLocation(new Pawn("black", [5, 3], board), [5, 3]);
        board.setLocation(new Pawn("black", [5, 5], board), [5, 5]);

        const possibleMoves = board.board[6][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Cant move over pieces", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

        board.setLocation(new Pawn("black", [5, 4], board), [5, 4]);

        const possibleMoves = board.board[6][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Cant move 2 steps if there is a piece at that position", () => {
        const board = new Board();
        board.setLocation(new Pawn("white", [6, 4], board), [6, 4]);

        board.setLocation(new Pawn("black", [4, 4], board), [4, 4]);

        const possibleMoves = board.board[6][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });
    });

    describe("Black pawn", () => {
      test("Can move up to 2 rows down when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        const possibleMoves = board.board[1][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Can move 1 row down when not at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [4, 4], board), [4, 4]);

        const possibleMoves = board.board[4][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Can capture pieces diagonally", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [2, 4], board), [2, 4]);

        board.setLocation(new Pawn("white", [3, 3], board), [3, 3]);
        board.setLocation(new Pawn("white", [3, 5], board), [3, 5]);

        const possibleMoves = board.board[2][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Can capture pieces diagonally and move 2 rows up when at starting position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        board.setLocation(new Pawn("white", [2, 3], board), [2, 3]);
        board.setLocation(new Pawn("white", [2, 5], board), [2, 5]);

        const possibleMoves = board.board[1][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Cant move over pieces", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        board.setLocation(new Pawn("white", [2, 4], board), [2, 4]);

        const possibleMoves = board.board[1][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("Cant move 2 steps if there is a piece at that position", () => {
        const board = new Board();
        board.setLocation(new Pawn("black", [1, 4], board), [1, 4]);

        board.setLocation(new Pawn("white", [3, 4], board), [3, 4]);

        const possibleMoves = board.board[1][4].possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });
    });
  });

  describe("Pawn promotion", () => {
    describe("White pawn", () => {
      test("Pawn promotes to queen when it reaches end of board", () => {
        const board = new Board();

        board.setLocation(new Pawn("white", [1, 0], board), [1, 0]);
        board.movePiece([1, 0], [0, 0]);

        expect(board.atLocation([0, 0]).constructor.name).toBe("Queen");
      });
    });

    describe("Black pawn", () => {
      test("Pawn promotes to queen when it reaches end of board", () => {
        const board = new Board();

        board.setLocation(new Pawn("black", [6, 0], board), [6, 0]);
        board.movePiece([6, 0], [7, 0]);

        expect(board.atLocation([7, 0]).constructor.name).toBe("Queen");
      });
    });
  });

  describe("En passant", () => {
    describe("White pawn", () => {
      test("En passant is included in list of possible moves when the conditions are met", () => {
        const board = new Board();

        board.setLocation(new Pawn("white", [3, 4], board), [3, 4]);
        board.setLocation(new Pawn("black", [1, 3], board), [1, 3]);

        board.movePiece([1, 3], [3, 3]);

        const possibleMoves = board.atLocation([3, 4]).possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves, true)
        ).toBe(true);
      });

      test("En passant works on the right side also", () => {
        const board = new Board();

        board.setLocation(new Pawn("white", [3, 4], board), [3, 4]);
        board.setLocation(new Pawn("black", [1, 5], board), [1, 5]);

        board.movePiece([1, 5], [3, 5]);

        const possibleMoves = board.atLocation([3, 4]).possibleMoves();
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(expectedPossibleMoves, possibleMoves)
        ).toBe(true);
      });

      test("En passant move disappears if not taken immediately", () => {
        const board = new Board();

        board.setLocation(new Pawn("white", [3, 4], board), [3, 4]);
        board.setLocation(new Pawn("black", [1, 3], board), [1, 3]);
        board.setLocation(new Queen("black", [7, 7], board), [7, 7]);
        board.setLocation(new Queen("white", [0, 0], board), [0, 0]);

        board.movePiece([1, 3], [3, 3]);

        // en passant is available now
        const expectedPossibleMoves = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(
          possibleMovesValidator(
            expectedPossibleMoves,
            board.atLocation([3, 4]).possibleMoves()
          )
        ).toBe(true);

        // make other moves
        board.movePiece([7, 7], [7, 6]);
        board.movePiece([0, 0], [0, 1]);

        // en passant was not immediately taken, it shouldnt be allowed anymore
        expectedPossibleMoves[2][3] = 0;

        expect(
          possibleMovesValidator(
            expectedPossibleMoves,
            board.atLocation([3, 4]).possibleMoves()
          )
        ).toBe(true);
      });

      test("left en passant move works and captures enemy pawn", () => {
        const board = new Board();

        const whitePawn = new Pawn("white", [3, 4], board);
        const blackPawn = new Pawn("black", [1, 3], board);

        board.setLocation(whitePawn, [3, 4]);
        board.setLocation(blackPawn, [1, 3]);

        board.movePiece([1, 3], [3, 3]);
        board.movePiece([3, 4], [2, 3]);

        expect(board.atLocation([2, 3])).toEqual(whitePawn);
        expect(board.atLocation([3, 3])).toBe(null);
      });

      test("right en passant move works and captures enemy pawn", () => {
        const board = new Board();

        const whitePawn = new Pawn("white", [3, 4], board);
        const blackPawn = new Pawn("black", [1, 5], board);

        board.setLocation(whitePawn, [3, 4]);
        board.setLocation(blackPawn, [1, 5]);

        board.movePiece([1, 5], [3, 5]);
        board.movePiece([3, 4], [2, 5]);

        expect(board.atLocation([2, 5])).toEqual(whitePawn);
        expect(board.atLocation([3, 5])).toBe(null);
      });
    });

    describe("Black pawn", () => {});

    // make sure to write a test for this too: https://chess.stackexchange.com/questions/18396/when-capturing-en-passant-is-a-position-possible-such-that-there-is-a-pin-over#:~:text=Really%20interesting%20question.%20I%20think%20the%20following%20shows%20that%20such%20a%20situation%20is%20sort%20of%20possible%2C%20depending%20on%20how%20you%20define%20the%20pin.
  });
});
