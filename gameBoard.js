export default class GameBoard {

  constructor() {
    // Create a 6-row by 7-column board
    this.matrix = [...new Array(6)].map(row =>
      [...new Array(7)].map(column => ' ')
    );
    // Current player, whose turn is it?
    this.currentPlayerColor = 'X';
    // Status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  // Render = output/draw something
  render() {
    let line = '\n' + '-'.repeat(29) + '\n';
    console.log(
      line +
      this.matrix.map(row =>
        row.map(column => `| ${column} `).join('')
        + '|').join(line) +
      line
    );
  }

  makeMove(color, column) {
    // Don't make any move if the game is over
    if (this.gameOver) { return false; }
    // Check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }
    // Check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }
    // Check that the column is a number - otherwise don't make the move
    if (isNaN(column)) { return false; }
    // Check that the column is between 0 and 6 - otherwise don't make the move
    if (column < 0 || column >= this.matrix[0].length) { return false; }

    // Find the first empty row in the selected column
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        // Make the move
        this.matrix[row][column] = color;
        // Change the current player color
        this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
        // Check if someone has won or if it's a draw/tie and update properties
        this.winner = this.winCheck();
        this.isADraw = this.drawCheck();
        // The game is over if someone has won or if it's a draw
        this.gameOver = this.winner || this.isADraw;
        // Return true if the move could be made
        return true;
      }
    }

    // Return false if the column is full
    return false;
  }

  winCheck() {
    let m = this.matrix;
    let offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // Horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // Vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // Diagonal down-right win
      [[0, 0], [1, -1], [2, -2], [3, -3]] // Diagonal down-left win
    ];

    for (let color of 'XO') {
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
          for (let winType of offsets) {
            let colorsInCombo = '';
            for (let [ro, co] of winType) {
              if (
                r + ro < 0 || r + ro >= m.length ||
                c + co < 0 || c + co >= m[0].length
              ) {
                colorsInCombo = '';
                break;
              }
              colorsInCombo += m[r + ro][c + co];
            }
            if (colorsInCombo === color.repeat(4)) {
              return color;
            }
          }
        }
      }
    }
    return false;
  }

  drawCheck() {
    // If no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  }

}
