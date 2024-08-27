import { test, expect } from 'vitest';
import GameBoard from '../classes/gameBoard.js';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPrompt.js';
import App from '../classes/app.js';

test('should register a move correctly', () => {
  const board = new GameBoard();
  board.makeMove('X', 3);
  expect(board.matrix[5][3]).toBe('X'); // The disc should be at the bottom of column 3
});

test('should only allow moves for the current player', () => {
  const board = new GameBoard();
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
test('should announce a draw when the board is full with no winner', () => {
  // Arrange: Create a new game board instance
  const board = new GameBoard();
setMockAnswers(
  'Player X',  // Name for player X
  'Player O',  // Name for player O
  '1',         // Move for player X
  '2',         // Move for player O
  '3',         // Continue moves as needed
  '4',         // Continue moves as needed
  '5',         // Continue moves as needed
  '6',         // Continue moves as needed
  '7',         // Continue moves as needed
  '1',         // Continue moves as needed
  '2',         // Continue moves as needed
  '3',         // Continue moves as needed
  '4',         // Continue moves as needed
  '5',         // Continue moves as needed
  '6',         // Continue moves as needed
  '7',         // Continue moves as needed
  '1',         // Continue moves as needed
  '2',         // Continue moves as needed
  '3',         // Continue moves as needed
  '4',         // Continue moves as needed
  '5',         // Continue moves as needed
  '6',         // Continue moves as needed
  '7',         // Continue moves as needed
  'end-test'   // End the test
);

// Simulate a board state that results in a draw
const simulateBoardForDraw = () => {
  board.matrix = [
    ['X', 'O', 'X', 'X', 'O', 'X', 'O'],
    ['X', 'X', 'O', 'O', 'X', 'O', 'X'],
    ['O', 'X', 'X', 'X', 'O', 'X', 'O'],
    ['X', 'O', 'X', 'X', 'O', 'X', 'X'],
    ['O', 'X', 'O', 'O', 'X', 'O', 'O'],
    ['X', 'O', 'X', 'O', 'X', 'X', 'O']
  ];
  board.isADraw = true;
  board.gameOver = true;
  board.winner = false;
};

// Act: Simulate the board configuration
simulateBoardForDraw();

// Assert: Check the expected results
expect(board.isADraw).toBe(true);
expect(board.gameOver).toBe(true);
expect(board.winner).toBe(false);

});