import Cell from './Cell.js';
import WinChecker from './WinChecker.js';

export default class Board {
  constructor(app) {
    this.app = app;
    // Create a 6x7 matrix representing the Connect Four board
    this.matrix = Array.from({ length: 6 }, (row, rowIndex) =>
      Array.from({ length: 7 }, (column, columnIndex) =>
        new Cell(rowIndex, columnIndex))
    );
    this.winChecker = new WinChecker(this);
    this.currentPlayerColor = 'X';  // Starting player
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = null;
  }

  render() {
    // Create the event handler called on click to handle column-based moves
    globalThis.makeMoveOnClick = (column) =>
      this.makeMove(this.currentPlayerColor, column, true) && this.app.render();

    // Set statuses for styling purposes
    document.body.setAttribute('currentPlayerColor', this.gameOver ? '' : this.currentPlayerColor);
    document.body.setAttribute('gameInProgress', this.app.namesEntered && !this.gameOver);

    // Render the board as HTML
    return /*html*/`<div class="board">
      ${this.matrix.map((row, rowIndex) =>
      row.map((cell, columnIndex) => /*html*/`
          <div
            class="cell ${cell.color} 
            ${this.winningCombo && this.winningCombo.cells.find(
        cell => cell.row === rowIndex && cell.column === columnIndex
      ) ? 'in-win' : ''}"
            onclick="makeMoveOnClick(${columnIndex})">
          </div>
        `).join('')).join('')}
    </div>`;
  }

  makeMove(color, column, fromClick) {
    let player = color === 'X' ? this.app.playerX : this.app.playerO;

    // Don't allow move if it's a bot's turn and the click event came from a player
    if (fromClick && player.type !== 'Human') return;

    // Check if the game is over
    if (this.gameOver) return false;

    // Validate that the column index is within the grid
    if (column < 0 || column >= this.matrix[0].length) return false;

    // Find the lowest available row in the column
    let row = this.findAvailableRow(column);
    if (row === -1) return false;  // No available row in this column

    // Place the token
    this.matrix[row][column].color = color;

    // Check for a winner or draw, then update game status
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    this.gameOver = this.winner || this.isADraw;

    // Switch players if the game is still ongoing
    if (!this.gameOver) {
      this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
    }

    // Make a bot move if needed
    this.initiateBotMove();

    return true;
  }

  findAvailableRow(column) {
    // Find the lowest available row in the given column
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column].color === ' ') {
        return row;
      }
    }
    return -1;  // No available row
  }

  winCheck() {
    return this.winChecker.winCheck();
  }

  drawCheck() {
    // The game is a draw if there are no empty cells left and no winner
    return !this.winCheck() &&
      !this.matrix.flat().some(cell => cell.color === ' ');
  }

  async initiateBotMove() {
    let player = this.currentPlayerColor === 'X' ? this.app.playerX : this.app.playerO;
    if (!this.gameOver && player && player.type !== 'Human') {
      document.body.classList.add('botPlaying');
      await player.makeBotMove();
      this.app.render();
      document.body.classList.remove('botPlaying');
    }
  }
}
