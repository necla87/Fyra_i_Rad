import { test, expect } from 'vitest';
import gameBoard from '../classes/gameBoard.js';
import { setMockAnswers, promptQuestions, consoleOutput, clearMocks } from './helpers/mockPrompt.js';

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
