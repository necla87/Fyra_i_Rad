import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import sleep from './helpers/sleep.js';

export default class App {

  constructor(playerX, playerO, whoStarts = 'X') {
    this.dialog = new Dialog();
    this.board = new Board(this); // Board is now 6x7 for Connect Four
    this.board.currentPlayerColor = whoStarts;
    this.whoStarts = whoStarts;
    this.setPlayAgainGlobals();
    // replay with existing players
    if (playerX && playerO) {
      this.playerX = playerX;
      this.playerO = playerO;
      // update players so that they know about the new board
      this.playerX.board = this.board;
      this.playerO.board = this.board;
      // start the new game
      this.namesEntered = true;
      this.board.initiateBotMove();
    }
    // enter new players
    else { this.askForNamesAndTypes(); }
    this.render();
  }

  async askForNamesAndTypes(color = 'X') {
    const okName = name => name.match(/[a-zåäöA-ZÅÄÖ]{2,}/);
    let playerName = '';
    let playerType = '';
    while (!okName(playerName)) {
      playerName = await this.dialog.ask(`Enter the name of player ${color}:`);
      await sleep(500);
      playerType = await this.dialog.ask(
        `Which type of player is ${playerName}?`,
        ['Human', 'A dumb bot', 'A smart bot']
      );
    }
    this['player' + color] = new Player(playerName, playerType, color, this.board);
    if (color === 'X') { this.askForNamesAndTypes('O'); return; }
    this.namesEntered = true;
    this.render();
    this.board.initiateBotMove();

    // make players global for debugging
    globalThis.playerX = this.playerX;
    globalThis.playerO = this.playerO;
  }

  namePossesive(name) {
    // Possessive form adjustment
    return name + (name.slice(-1).toLowerCase() !== 's' ? `'s` : `'`);
  }

  render() {
    let color = this.board.currentPlayerColor;
    let player = color === 'X' ? this.playerX : this.playerO;
    let name = player?.name || '';

    document.querySelector('main').innerHTML = /*html*/`
      <h1>Fyra i rad (Connect Four)</h1>
      ${!this.board.gameOver && player ?
        `<p>${color}: ${this.namePossesive(name)} turn...</p>` :
        (this.namesEntered ? '' : '<p>Enter names</p>')}
      ${!this.board.gameOver ? '' : /*html*/`
        ${!this.board.isADraw ? '' : `<p>It's a tie...</p>`}
        ${!this.board.winner ? '' : `<p>${color}: ${name} won!</p>`}
      `}
      ${this.board.render()}
      <div class="buttons">
        ${!this.board.gameOver ?
        this.renderQuitButton() :
        this.renderPlayAgainButtons()}
      </div>
    `;
  }

  renderQuitButton() {
    if (!this.namesEntered) { return ''; }

    globalThis.quitGame = async () => {
      let answer = await this.dialog.ask(
        'What do you want to do?',
        ['Continue the game', 'Play again', 'Enter new players']
      );
      answer === 'Play again' && globalThis.playAgain();
      answer === 'Enter new players' && globalThis.newPlayers();
    };

    return /*html*/`
      <div class="button" onclick="quitGame()">
        Quit this game
      </div>
    `;
  }

  setPlayAgainGlobals() {
    // Set global methods for "play again" and "new players"
    globalThis.playAgain = async () => {
      let playerToStart = this.whoStarts === 'X' ? this.playerO : this.playerX;
      await this.dialog.ask(
        `It's ${this.namePossesive(playerToStart.name)} turn to start!`, ['OK']);
      new App(this.playerX, this.playerO, playerToStart.color);
    };
    globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons() {
    // Buttons for playing again or starting with new players
    return /*html*/`
      <div class="button" href="#" onclick="playAgain()">Play again</div>
      <div class="button" href="#" onclick="newPlayers()">New players</div>
    `;
  }

}
