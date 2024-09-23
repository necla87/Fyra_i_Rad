import WinCombo from "./WinCombo.js";

export default class WinChecker {

  constructor(board) {
    this.board = board;
    this.matrix = board.matrix;
    // there are many possible winCombos in Connect Four (69 is just a rough estimate)
    this.winCombos = [];
    this.calculateWinCombos();
  }

  // calculate all the win combos once and remember them
  calculateWinCombos() {
    let m = this.matrix;
    let rowCount = m.length;        // Number of rows (6)
    let colCount = m[0].length;     // Number of columns (7)

    // Offset patterns for Connect Four (4 in a row)
    let offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // Horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // Vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // Diagonal down-right win
      [[0, 0], [1, -1], [2, -2], [3, -3]] // Diagonal down-left win
    ];

    // Loop through the board to find all winCombos
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        // Check all offset patterns (horizontal, vertical, diagonal)
        for (let winType of offsets) {
          let combo = [];
          for (let [ro, co] of winType) {
            if (r + ro < 0 || r + ro >= rowCount) continue;  // Boundary check for rows
            if (c + co < 0 || c + co >= colCount) continue;  // Boundary check for columns
            combo.push(m[r + ro][c + co]); // Collect cells for potential win combo
          }
          if (combo.length === 4) {
            this.winCombos.push(new WinCombo(combo)); // Only add complete 4-cell combos
          }
        }
      }
    }
  }

  // Check if any win combo is satisfied
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
