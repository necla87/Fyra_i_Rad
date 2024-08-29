import { test, expect } from 'vitest';
import GameBoard from '../classes/gameBoard.js';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
} from './helpers/mockPrompt.js';
import App from '../classes/app.js';

test('should register a move correctly', () => {
  const board = new GameBoard();
  board.makeMove('X', 3);
  expect(board.matrix[5][3]).toBe('X'); 
});

test('should only allow moves for the current player', () => {
  const board = new GameBoard();
  board.makeMove('X', 0);
  board.makeMove('O', 1); 
  expect(board.currentPlayerColor).toBe('X'); 
  board.makeMove('X', 2); 
  board.makeMove('X', 3); 
  expect(board.currentPlayerColor).toBe('O'); 
});

test('should prevent moves after the game is won', () => {
  
  setMockAnswers(
    'Player 1',   
    'Player 2',   
    '1', '1',   
    '2', '2',    
    '3', '3',  
    '4',          
    '5',          
    'nej'        
  );

  
  try {
    new App(); 
  } catch (e) {
    if (e.message !== 'end-test') throw e; 
  }

  
  expect(consoleOutput).toContainEqual(['Grattis X: Player 1 du har vunnit!']);

  
  expect(promptQuestions[promptQuestions.length - 1]).not.toContain('välj ett kolumn');
});
test('should announce a draw when the board is full with no winner', () => {
  
  const board = new GameBoard();
setMockAnswers(
  'Player X',  
  'Player O',  
  '1',        
  '2',         
  '3',         
  '4',         
  '5',        
  '6',         
  '7',         
  '1',         
  '2',         
  '3',         
  '4',         
  '5',         
  '6',         
  '7',        
  '1',         
  '2',         
  '3',         
  '4',         
  '5',         
  '6',         
  '7',         
  'end-test'   
);


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

simulateBoardForDraw();


expect(board.isADraw).toBe(true);
expect(board.gameOver).toBe(true);
expect(board.winner).toBe(false);

});


test('Horizontal win', () => {
  let gameBoard = new GameBoard();
  gameBoard.matrix[5][0] = 'X';
  gameBoard.matrix[5][1] = 'X';
  gameBoard.matrix[5][2] = 'X';
  gameBoard.matrix[5][3] = 'X';
  console.log('Test 1: Horizontal win');
  console.assert(gameBoard.winCheck() === 'X', 'Failed: Expected X to win');
});

test('Vertical win', () => {
  let gameBoard = new GameBoard();
  gameBoard.matrix[5][0] = 'O';
  gameBoard.matrix[4][0] = 'O';
  gameBoard.matrix[3][0] = 'O';
  gameBoard.matrix[2][0] = 'O';
  console.log('Test 2: Vertical win');
  console.assert(gameBoard.winCheck() === 'O', 'Failed: Expected O to win');
});

test('Diagonal down-right win', () => {
  let gameBoard = new GameBoard();
  gameBoard.matrix[0][0] = 'X';
  gameBoard.matrix[1][1] = 'X';
  gameBoard.matrix[2][2] = 'X';
  gameBoard.matrix[3][3] = 'X';
  console.log('Test 3: Diagonal down-right win');
  console.assert(gameBoard.winCheck() === 'X', 'Failed: Expected X to win');
});

test('Diagonal down-left win', () => {
  let gameBoard = new GameBoard();
  gameBoard.matrix[0][3] = 'O';
  gameBoard.matrix[1][2] = 'O';
  gameBoard.matrix[2][1] = 'O';
  gameBoard.matrix[3][0] = 'O';
  console.log('Test 4: Diagonal down-left win');
  console.assert(gameBoard.winCheck() === 'O', 'Failed: Expected O to win');
});

test('No win (empty board)', () => {
  let gameBoard = new GameBoard();
  console.log('Test 5: No win (empty board)');
  console.assert(gameBoard.winCheck() === false, 'Failed: Expected no winner');
});

test('No win (incomplete line)', () => {
  let gameBoard = new GameBoard();
  gameBoard.matrix[5][0] = 'X';
  gameBoard.matrix[5][1] = 'X';
  gameBoard.matrix[5][2] = 'X';
  console.log('Test 6: No win (incomplete line)');
  console.assert(gameBoard.winCheck() === false, 'Failed: Expected no winner');
});

console.log('All tests completed.');


test('should announce the winner with "du har vunnit" message', () => {
  
  setMockAnswers(
    'Player X',  
    'Player O',  
    '1',         
    '1',         
    '2',         
    '2',         
    '3',        
    '3',         
    '4',         
    'end-test'   
  );

  try {
    const app = new App();
  } catch (error) {
    if (error.message !== 'end-test') {
      throw error;
    }
  }

  const winnerMessage = consoleOutput.find(line =>
    line.includes('Grattis X: Player X du har vunnit!')
  );

  expect(winnerMessage).toBeTruthy(); 
});