import shuffleArray from "./helpers/arrayShuffle.js";
import sleep from './helpers/sleep.js';

export default class Player {

  constructor(name, type, color, board) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.opponent = this.color === 'X' ? 'O' : 'X';
    this.board = board;
  }

  async makeBotMove() {
    // Simulate thinking time for the bot
    await sleep(500);
    let column;

    if (this.type === 'En enkel bot') {
      column = this.makeDumbBotMove();
    } else if (this.type === 'En svår bot') {
      column = this.makeSmartBotMove();
    }

    // Make the move if a valid column was chosen
    if (column !== undefined) {
      await this.board.makeMove(this.color, column);
    }
  }

  makeDumbBotMove() {
    const legalMoves = this.legalMoves; // Get available columns
    return legalMoves.length > 0 ? shuffleArray(legalMoves)[0][1] : undefined; // Return column index
  }

  makeSmartBotMove() {
    let orgState = this.state(); // Current state of the board
    let scores = [];

    // Loop through each legal move to evaluate scores
    for (let [row, column] of this.legalMoves) {
      this.board.matrix[row][column].color = this.color; // Temporarily place the token
      let futureState = this.state(); // State after the move
      this.board.matrix[row][column].color = ' '; // Undo the temporary move

      // Record the score for this move
      scores.push({ column, score: this.score(orgState, futureState) });
    }

    // Sort scores and select the best move
    scores = shuffleArray(scores).sort((a, b) => b.score - a.score);
    return scores.length > 0 ? scores[0].column : undefined; // Return column index
  }

  score(orgState, futureState) {
    let priorities = [
      { me: 3 }, { opp: 2 }, { opp: 1 }, { me: 2 }, { me: 1 }
    ];
    let score = 0;

    // Evaluate the score for potential winning combinations
    for (let i = 0; i < orgState.length; i++) {
      let b = orgState[i], a = futureState[i];
      if (b.me === a.me && b.opp === a.opp) continue; // No change
      if (b.me > 0 && b.opp > 0) continue; // Blocked combo

      let partScore = '';
      for (let j = 0; j < priorities.length; j++) {
        let key = Object.keys(priorities[j])[0];
        let value = priorities[j][key];
        partScore += (a[key] === value) ? '01' : '00';
      }
      score += +partScore;
    }

    // Consider potential opponent's winning moves
    return score;
  }

  get legalMoves() {
    let moves = [];
    for (let column = 0; column < this.board.matrix[0].length; column++) {
      for (let row = this.board.matrix.length - 1; row >= 0; row--) {
        if (this.board.matrix[row][column].color === ' ') {
          moves.push([row, column]);
          break; // Only the lowest empty cell in the column
        }
      }
    }
    return moves; // Return available moves as [row, column]
  }

  state() {
    let state = [];
    for (let winCombo of this.board.winChecker.winCombos) {
      state.push({
        me: winCombo.numberOfCells(this.color),
        opp: winCombo.numberOfCells(this.opponent)
      });
    }
    return state; // Return the state representation for win combinations
  }

}
