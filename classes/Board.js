import Cell from './Cell.js';
import WinChecker from './WinChecker.js';
import Network from './helpers/Network.js';

export default class Board {
  constructor(app) {
    this.app = app;
    // Create a 6x7 matrix for Connect Four
    this.matrix = [...new Array(6)].map((row, rowIndex) =>
      [...new Array(7)].map((column, columnIndex) =>
        new Cell(rowIndex, columnIndex))
    );
    // Create a new winChecker
    this.winChecker = new WinChecker(this);
    // Current player, whose turn is it?
    this.currentPlayerColor = 'X';
    // Status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = null;
  }

  render() {
    // Create the event handler called on click:
    // makeMove and if makeMove returns true
    // then call the app render method
    globalThis.makeMoveOnClick = (column) =>
      this.makeMove(this.currentPlayerColor, column, true)
      && this.app.render();

    // Set some statuses as attributes to the body
    document.body.setAttribute('currentPlayerColor',
      this.gameOver ? '' : this.currentPlayerColor);
    document.body.setAttribute('gameInProgress',
      this.app.namesEntered && !this.gameOver);

    // Render the board as HTML
    return /*html*/`<div class="board">
      ${this.matrix.map((row) =>
      row.map((cell) => /*html*/`
        <div
          class="cell ${cell} 
          ${this.winningCombo && this.winningCombo.cells.find(
        winningCell => winningCell.row === cell.row && winningCell.column === cell.column
      ) ? 'in-win' : ''}"
          onclick="makeMoveOnClick(${cell.column})">
        </div>
      `).join('')).join('')}
    </div>`;
  }

  makeMove(color, column, fromClick) {
    let player = color === 'X' ? this.app.playerX : this.app.playerO;
    // Don't allow move fromClick if it's network play and not myColor
    if (fromClick && this.app.networkPlay && color !== this.app.myColor) {
      return false;
    }
    // Don't allow move fromClick if it's a bot's turn to play
    if (fromClick && player.type !== 'Människa') { return false; }
    // Don't make any move if the game is over
    if (this.gameOver) { return false; }
    // Check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }
    // Check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }
    // Check that the column is valid
    if (isNaN(column) || column < 0 || column >= this.matrix[0].length) { return false; }

    // Find the lowest empty row in the column
    const row = this.findLowestEmptyRow(column);
    if (row === -1) { return false; } // Column is full

    // Make the move
    this.matrix[row][column].color = color;
    // Check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    // The game is over if someone has won or if it's a draw
    this.gameOver = this.winner || this.isADraw;

    // If network play then send the move
    this.app.networkPlay && this.app.myColor === color &&
      Network.send({ color, row, column });

    // Change the current player color, if the game is not over
    !this.gameOver
      && (this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X');
    // Make bot move if the next player is a bot
    this.initiateBotMove();

    // Return true if the move could be made
    return true;
  }

  findLowestEmptyRow(column) {
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column].color === ' ') {
        return row; // Return the lowest empty row in the column
      }
    }
    return -1; // Return -1 if the column is full
  }

  winCheck() {
    return this.winChecker.winCheck();
  }

  // Check for a draw/tie
  drawCheck() {
    // If no one has won and no empty positions then it's a draw
    return !this.winCheck() &&
      !this.matrix.flat().map(cell => cell.color).includes(' ');
  }

  // Note: this does nothing if the player is a human
  async initiateBotMove() {
    // Get the current player
    let player = this.currentPlayerColor === 'X' ? this.app.playerX : this.app.playerO;
    // If the game isn't over and the player exists and the player is non-human / a bot
    if (!this.gameOver && player && player.type !== 'Människa') {
      setTimeout(() => document.body.classList.add('notMyTurn'), 1);
      await player.makeBotMove();
      this.app.render();
      document.body.classList.remove('notMyTurn');
    }
  }
}

