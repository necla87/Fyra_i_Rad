import { test, expect } from 'vitest';
import gameBoard from '../classes/gameBoard.js';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPrompt.js';
import App from '../classes/app.js';

test('should register a move correctly', () => {
  const board = new gameBoard();
  board.makeMove('X', 3);
  expect(board.matrix[5][3]).toBe('X'); // The disc should be at the bottom of column 3
});

test('should only allow moves for the current player', () => {
  const board = new gameBoard();
  board.makeMove('X', 0);
  board.makeMove('O', 1); // O's turn, valid
  expect(board.currentPlayerColor).toBe('X'); // X's turn now
  board.makeMove('X', 2); // X's turn, valid
  board.makeMove('X', 3); // Invalid move, should be prevented
  expect(board.currentPlayerColor).toBe('O'); // O's turn
});

test('should prevent moves after the game is won', () => {
  // Arrange: Set up the mock answers
  setMockAnswers(
    'Player 1',   // Player 1's name
    'Player 2',   // Player 2's name
    '1', '1',     // X and O move in column 1
    '2', '2',     // X and O move in column 2
    '3', '3',     // X and O move in column 3
    '4',          // X moves in column 4 (winning move)
    '5',          // Try to make another move after the game is won
    'nej'         // End the game
  );

  // Act: Run the app
  try {
    new App(); // Run the application flow
  } catch (e) {
    if (e.message !== 'end-test') throw e; // Handle the 'end-test' signal if it's thrown
  }

  // Assert: Check that no move is made after the game is won
  expect(consoleOutput).toContainEqual(['Grattis X: Player 1 du har vunnit!']);

  // Ensure no more moves are accepted after the game is won
  expect(promptQuestions[promptQuestions.length - 1]).not.toContain('välj ett kolumn');
});

// test('should announce a draw when the board is full with no winner', () => {
//   // Arrange: Create a new game board instance
//   const board = new gameBoard(); // Correct class name

//   // Function to fill the board without causing a win
//   const fillBoardWithoutWin = () => {
//     const moves = [
//       [0, 1, 2, 3, 4, 5, 6],
//       [1, 2, 3, 4, 5, 6, 0],
//       [2, 3, 4, 5, 6, 0, 1],
//       [3, 4, 5, 6, 0, 1, 2],
//       [4, 5, 6, 0, 1, 2, 3],
//       [5, 6, 0, 1, 2, 3, 4]
//     ];

//     // Interleave moves to fill the board
//     for (let i = 0; i < 42; i++) {
//       const color = i % 2 === 0 ? 'X' : 'O'; // Alternate colors
//       const column = moves[i % 6][Math.floor(i / 6) % 7]; // Pick column
//       board.makeMove(color, column);
//     }
//   };

//   // Fill the board with non-winning moves
//   fillBoardWithoutWin();

//   // Act: Attempt to make a move after the board is full (shouldn't be possible)
//   board.makeMove('X', 0);

//   // Check console output for draw message
//   const drawMessage = 'Det blev oavgjort!';

//   // Print consoleOutput for debugging
//   console.log('Console Output:', consoleOutput);

//   // Assert: Check that a draw message is included in the console output
//   expect(consoleOutput.some(entry => entry.includes(drawMessage))).toBe(true);

//   // Assert: Ensure the game is marked as over
//   expect(board.gameOver).toBe(true);
// });
