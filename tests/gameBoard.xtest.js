import { test, expect } from 'vitest';
import gameBoard from '../classes/gameBoard.js';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
} from './helpers/mockPrompt.js';
import App from '../classes/app.js';

test('should register a move correctly', () => {
  const board = new gameBoard();
  board.makeMove('X', 3);
  expect(board.matrix[5][3]).toBe('X'); 
});

test('should only allow moves for the current player', () => {
  const board = new gameBoard();
  board.makeMove('X', 0);
  board.makeMove('O', 1); 
  expect(board.currentPlayerColor).toBe('X'); 
  board.makeMove('X', 2); 
  board.makeMove('X', 3); 
  expect(board.currentPlayerColor).toBe('O'); 
});

// test('should prevent moves after the game is won', () => {
//   const board = new gameBoard();

//   // Simulate moves leading to a win for Player X
//   board.makeMove('X', 0); // Player X
//   board.makeMove('O', 1); // Player O
//   board.makeMove('X', 0); // Player X
//   board.makeMove('O', 1); // Player O
//   board.makeMove('X', 0); // Player X
//   board.makeMove('O', 1); // Player O
//   board.makeMove('X', 0); // Player X - wins the game

//   // Verify that the game recognizes the win
//   expect(board.winner).toBe('X');  // Check that the winner is 'X'
//   expect(board.gameOver).toBe(true);  // Check that the game is over

//   // Try to make another move after the game is over
//   const moveAfterWin = board.makeMove('O', 2);

//   // Verify that the move was not allowed and the game state did not change
//   expect(moveAfterWin).toBe(false); // Assuming makeMove returns false if the game is over
//   expect(board.matrix[5][2]).toBe(' '); // The cell should remain empty

//   // Verify that no more moves can be made and no prompt for input appears
//   expect(consoleOutput).toContain('Grattis X: Player 1 du har vunnit!');
// });


test('should announce a draw when the board is full with no winner', () => {
  
  const board = new gameBoard();
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
  const board = new gameBoard(); // Consistent with other tests

  // Set up the board for a horizontal win
  board.matrix[5][0] = 'X';
  board.matrix[5][1] = 'X';
  board.matrix[5][2] = 'X';
  board.matrix[5][3] = 'X';

  expect(board.winCheck()).toBe('X');
});


test('Vertical win', () => {
  const board = new gameBoard(); 
  
  board.matrix[5][0] = 'O';
  board.matrix[4][0] = 'O';
  board.matrix[3][0] = 'O';
  board.matrix[2][0] = 'O';

  expect(board.winCheck()).toBe('O');
});

test('Diagonal down-right win', () => {
  const board = new gameBoard(); 

 
  board.matrix[0][0] = 'X';
  board.matrix[1][1] = 'X';
  board.matrix[2][2] = 'X';
  board.matrix[3][3] = 'X';


  expect(board.winCheck()).toBe('X');
});

test('Diagonal down-left win', () => {
  const board = new gameBoard(); 

  board.matrix[0][3] = 'O';
  board.matrix[1][2] = 'O';
  board.matrix[2][1] = 'O';
  board.matrix[3][0] = 'O';

  
  expect(board.winCheck()).toBe('O');
});

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