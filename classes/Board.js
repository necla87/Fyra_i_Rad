export default class Board {
  constructor(app) {
    this.app = app;
    this.rows = 6; // Number of rows
    this.columns = 7; // Number of columns
    this.matrix = [...new Array(this.rows)].map(() =>
      [...new Array(this.columns)].map(() => ' ')
    );
    this.currentPlayerColor = 'X'; // Start with player X
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = [];
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

    // Render the board
    return /*html*/ `<div class="board">
      ${this.matrix
        .map(
          (row, rowIndex) =>
            `<div class="row">${row
              .map(
                (cell, columnIndex) => /*html*/ `
              <div
                class="cell ${cell} ${this.winningCombo.includes(
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

    // Find the lowest empty row in the selected column
    let row = this.rows - 1;
    while (row >= 0 && this.matrix[row][column] !== ' ') {
      row--;
    }

    if (row < 0) return false; // Column is full

    // Place the player's token in the selected column
    this.matrix[row][column] = color;
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    this.gameOver = this.winner || this.isADraw;
    !this.gameOver &&
      (this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X');
    return true;
  }

  winCheck() {
    let m = this.matrix;
    let directions = [
      { row: 0, col: 1 }, // Horizontal
      { row: 1, col: 0 }, // Vertical
      { row: 1, col: 1 }, // Diagonal down-right
      { row: 1, col: -1 }, // Diagonal down-left
    ];

    // Loop through each cell and check in each direction for 4 in a row
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let color = m[r][c];
        if (color === ' ') continue;

        for (let { row, col } of directions) {
          let winningCombo = [];
          let count = 0;

          // Check 4 cells in the current direction
          for (let i = 0; i < 4; i++) {
            let newRow = r + i * row;
            let newCol = c + i * col;

            if (
              newRow >= 0 &&
              newRow < this.rows &&
              newCol >= 0 &&
              newCol < this.columns &&
              m[newRow][newCol] === color
            ) {
              count++;
              winningCombo.push('row' + newRow + 'column' + newCol);
            } else {
              break;
            }
          }

          if (count === 4) {
            this.winningCombo = winningCombo;
            return color;
          }
        }
      }
    }
    return false;
  }

  drawCheck() {
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  }
}
