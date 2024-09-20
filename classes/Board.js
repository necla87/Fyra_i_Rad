import Cell from './Cell.js';
import WinChecker from './WinChecker.js';

export default class Board {
  constructor(app) {
    this.app = app;
    this.rows = 6; // Number of rows
    this.columns = 7; // Number of columns
    this.matrix = [...new Array(this.rows)].map(() =>
      [...new Array(this.columns)].map(() => new Cell())
    );
    this.currentPlayerColor = 'X'; // Start with player X
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = [];
    this.winChecker = new WinChecker(this);
  }

  render() {
    globalThis.makeMoveOnClick = (column) =>
      this.makeMove(this.currentPlayerColor, column) &&
      this.app.render();

    document.body.setAttribute(
      'currentPlayerColor',
      this.gameOver ? '' : this.currentPlayerColor
    );
    document.body.setAttribute(
      'gameInProgress',
      this.app.namesEntered && !this.gameOver
    );

    // Render the game board
    return /*html*/ `<div class="board">
      ${this.matrix
        .map(
          (row, rowIndex) =>
            `<div class="row">${row
              .map(
                (cell, columnIndex) => /*html*/ `
              <div
                class="cell ${cell.color} ${this.winningCombo.includes(
                  'row' + rowIndex + 'column' + columnIndex
                )
                    ? 'in-win'
                    : ''
                  }"
                onclick="makeMoveOnClick(${columnIndex})">
              </div>
            `
              )
              .join('')}</div>`
        )
        .join('')}
    </div>`;
  }

  makeMove(color, column) {
    if (this.gameOver) return false;
    if (color !== 'X' && color !== 'O') return false;
    if (color !== this.currentPlayerColor) return false;
    if (isNaN(column) || column < 0 || column >= this.columns) return false;

    // Find the lowest empty row in the chosen column
    let row = this.rows - 1;
    while (row >= 0 && this.matrix[row][column].color !== ' ') {
      row--;
    }

    if (row < 0) return false; // Column is full

    // Place the player's token in the chosen column
    this.matrix[row][column].color = color;
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    this.gameOver = this.winner || this.isADraw;
    if (!this.gameOver) {
      this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
      this.initiateBotMove(); // Start bot's turn if next player is a bot
    }
    return true;
  }

  winCheck() {
    return this.winChecker.winCheck();
  }

  drawCheck() {
    return !this.winCheck() && !this.matrix.flat().map(cell => cell.color).includes(' ');
  }

  async initiateBotMove() {
    // Get the current player
    let player = this.currentPlayerColor === 'X' ? this.app.playerX : this.app.playerO;

    // If the game isn't over and the player exists and the player is non-human / a bot
    if (!this.gameOver && player && player.type !== 'Human') {
      document.body.classList.add('botPlaying');

      // The bot needs to choose a column to place its token
      const column = await player.makeBotMove();

      // Check if the move was valid
      if (column !== null && column >= 0 && column < this.columns) {
        this.makeMove(this.currentPlayerColor, column);
        this.app.render();
      }

      document.body.classList.remove('botPlaying');
    }
  }
}
