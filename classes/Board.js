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

  makeMove(color, column, fromClick) {
    let player = color === 'X' ? this.app.playerX : this.app.playerO;

    // Don't allow move fromClick if it's a bot's turn to play
    if (fromClick && player.type !== 'Människa') { return; }

    // Don't make any move if the game is over
    if (this.gameOver) { return false; }

    // Check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }

    // Check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }

    // Check that the column is a number - otherwise don't make the move
    if (isNaN(column)) { return false; }

    // Check that the column is within the valid range
    if (column < 0 || column >= this.matrix[0].length) { return false; }

    // Find the lowest empty row in the specified column
    let row = this.matrix.findIndex((cell) => cell[column].color === ' ');

    // If the column is full (no empty row), don't make the move
    if (row === -1) { return false; }

    // Make the move by placing the token in the lowest available row
    this.matrix[row][column].color = color;

    // Check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();

    // The game is over if someone has won or if it's a draw
    this.gameOver = this.winner || this.isADraw;

    // Change the current player color, if the game is not over
    if (!this.gameOver) {
      this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
    }

    // Make bot move if the next player is a bot
    this.initiateBotMove();

    // Return true if the move could be made
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
    if (!this.gameOver && player && player.type !== 'Manniska') {
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
