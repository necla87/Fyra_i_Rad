import Dialog from './dialog.js';
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
      playerName = await this.dialog.ask(`Skriv in spelarens namn ${color}:`);
      await sleep(500);
      playerType = await this.dialog.ask(
        `Vilken typ av spelare ${playerName}?`,
        ['Människa', 'En enkel bot', 'En svår bot']
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
      <h1>Fyra i rad</h1>
      ${!this.board.gameOver && player ?
        `<p>${color}: ${this.namePossesive(name)} tur...</p>` :
        (this.namesEntered ? '' : '<p>Skriv in namn</p>')}
      ${!this.board.gameOver ? '' : /*html*/`
        ${!this.board.isADraw ? '' : `<p>Det blev oavgjort...</p>`}
        ${!this.board.winner ? '' : `<p>${color}: ${name} vann!</p>`}
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
        'Vad vill du göra?',
        ['Fortsätta', 'Spela igen', 'Nya spelare']
      );
      answer === 'Spela igen' && globalThis.playAgain();
      answer === 'Nya spelare' && globalThis.newPlayers();
    };

    return /*html*/`
      <div class="button" onclick="quitGame()">
        Avsluta
      </div>
    `;
  }

  setPlayAgainGlobals() {
    // Set global methods for "play again" and "new players"
    globalThis.playAgain = async () => {
      let playerToStart = this.whoStarts === 'X' ? this.playerO : this.playerX;
      await this.dialog.ask(
        `Det är ${this.namePossesive(playerToStart.name)} tur att börja!`, ['OK']);
      new App(this.playerX, this.playerO, playerToStart.color);
    };
    globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons() {
    // Buttons for playing again or starting with new players
    return /*html*/`
      <div class="button" href="#" onclick="playAgain()">Spela igen</div>
      <div class="button" href="#" onclick="newPlayers()">Nya spelare</div>
    `;
  }

}
