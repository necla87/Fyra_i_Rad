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
    // a short delay to make the bot seem more 'human'
    // (simulate that it takes time for it to think)
    await sleep(500);
    let column;
    if (this.type === 'A dumb bot') {
      column = this.makeDumbBotMove();
    }
    if (this.type === 'A smart bot') {
      column = this.makeSmartBotMove();
    }
    await this.board.makeMove(this.color, column);
  }

  makeDumbBotMove() {
    return shuffleArray(this.legalMoves)[0];
  }

  makeSmartBotMove() {
    // orgState - the current state on the board
    let orgState = this.state();
    // store scores for each possible move in scores
    let scores = [];
    // loop through/try each legal/possible move (by column)
    for (let column of this.legalMoves) {
      // Find the lowest available row in the selected column
      let row = this.findLowestEmptyRow(column);
      if (row === null) continue; // Skip if column is full
      let cell = this.board.matrix[row][column];
      cell.color = this.color; // make temporary move
      let futureState = this.state(); // the state if we made this move
      cell.color = ' '; // undo temporary move
      // remember the score for this possible move
      scores.push({ row, column, score: this.score(orgState, futureState) });
    }
    scores = shuffleArray(scores).sort((a, b) => a.score > b.score ? -1 : 1);
    let { column } = scores[0];
    return column;
  }

  score(orgState, futureState) {
    // priorities - what is considered the best outcome in each winCombo
    let priorities = [
      { me: 4 }, { opp: 3 }, { opp: 2 }, { me: 3 }, { me: 2 }
    ];
    // score variable - which we will use to calculate a score
    let score = 0;
    // loop through each part of the states, corresponding to a winCombo
    for (let i = 0; i < orgState.length; i++) {
      let b = orgState[i], a = futureState[i];
      if (b.me === a.me && b.opp === a.opp) { continue; }
      if (b.me > 0 && b.opp > 0) { continue; }
      let partScore = '';
      for (let j = 0; j < priorities.length; j++) {
        let key = Object.keys(priorities[j])[0];
        let value = priorities[j][key];
        if (a[key] === value) { partScore += '01'; }
        else { partScore += '00'; }
      }
      score += +partScore;
    }

    return score;
  }

  get legalMoves() {
    // In Connect Four, a legal move is an available column (not full)
    let moves = [];
    for (let column = 0; column < this.board.matrix[0].length; column++) {
      if (this.board.matrix[0][column].color === ' ') {
        moves.push(column);
      }
    }
    return moves;
  }

  // Find the lowest empty row in a column
  findLowestEmptyRow(column) {
    for (let row = this.board.matrix.length - 1; row >= 0; row--) {
      if (this.board.matrix[row][column].color === ' ') {
        return row;
      }
    }
    return null; // If the column is full
  }

  state() {
    let state = [];
    for (let winCombo of this.board.winChecker.winCombos) {
      state.push({
        me: winCombo.numberOfCells(this.color),
        opp: winCombo.numberOfCells(this.opponent)
      });
    }
    return state;
  }

}
