import WinCombo from "./WinCombo.js";

export default class WinChecker {
  constructor(board) {
    this.board = board;
    this.matrix = board.matrix;
    this.winCombos = [];
    this.calculateWinCombos();
  }

  // Calculate all the win combos once and store them
  calculateWinCombos() {
    let m = this.matrix;
    let directions = [
      { row: 0, col: 1 },   // Horisontell
      { row: 1, col: 0 },   // Vertikal
      { row: 1, col: 1 },   // Diagonal nedåt höger
      { row: 1, col: -1 }   // Diagonal nedåt vänster
    ];

    // Loop through the board to find all possible win combinations
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        for (let { row, col } of directions) {
          let combo = [];
          for (let i = 0; i < 4; i++) { // Check for 4 in a row
            let newRow = r + i * row;
            let newCol = c + i * col;
            if (newRow < 0 || newRow >= m.length || newCol < 0 || newCol >= m[0].length) {
              break; // Out of bounds
            }
            combo.push(m[newRow][newCol]);
          }
          if (combo.length === 4) {
            this.winCombos.push(new WinCombo(combo));
          }
        }
      }
    }
  }

  winCheck() {
    for (let winCombo of this.winCombos) {
      if (winCombo.isWin('X')) {
        this.board.winningCombo = winCombo;
        return 'X';
      }
      if (winCombo.isWin('O')) {
        this.board.winningCombo = winCombo;
        return 'O';
      }
    }
    return false;
  }
}
