import Dialog from './dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import sleep from './helpers/sleep.js';

export default class App {

  constructor(playerX, playerO, whoStarts = 'X') {
    this.dialog = new Dialog();
    this.board = new Board(this);
    this.board.currentPlayerColor = whoStarts;
    this.whoStarts = whoStarts;
    this.setPlayAgainGlobals();
    if (playerX && playerO) {
      this.playerX = playerX;
      this.playerO = playerO;
      this.namesEntered = true;
    }
    else { this.askForNames(); }
    this.render();
  }

  async askForNames(color = 'X') {
    const okName = name => name.match(/[a-zåäöA-ZÅÄÖ]{2,}/);
    let playerName = '';
    while (!okName(playerName)) {
      playerName = await this.dialog.ask(`Skriv in spelarens namn ${color}:`);
      await sleep(500);
    }
    this['player' + color] = new Player(playerName, color);
    if (color === 'X') { this.askForNames('O'); return; }
    this.namesEntered = true;
    this.render();
  }

  namePossesive(name) {
    // although not necessary, it's nice with a traditional
    // possesive form of the name when it ends with an "s":
    // i.e. "Thomas'" rather than "Thomas's" but "Anna's" :)
    return name + (name.slice(-1).toLowerCase() !== 's' ? `'s` : `'`)
  }

  render() {
    let color = this.board.currentPlayerColor;
    let player = color === 'X' ? this.playerX : this.playerO;
    let name = player?.name || '';

    document.querySelector('main').innerHTML = /*html*/`
      <h1>4 i rad</h1>
      ${!this.board.gameOver && player ?
        `<p>${color}: ${this.namePossesive(name)} tur...</p>`
        : (this.namesEntered ? '' : '<p>Skriv in namn</p>')}
      ${!this.board.gameOver ? '' : /*html*/`
        ${!this.board.isADraw ? '' : `<p>Oavgjort...</p>`}
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
    // play again 
    globalThis.playAgain = async () => {
      let playerToStart = this.whoStarts === 'X' ? this.playerO : this.playerX;
      await this.dialog.ask(
        `Det ${this.namePossesive(playerToStart.name)} tur att starta!`, ['OK']);
      new App(this.playerX, this.playerO, playerToStart.color);
    }
    // start a-fresh with new players
    globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons() {
    // why not use the button element? 
    // div tags are easier to style in a cross-browser-compatible way
    return /*html*/`
      <div class="button" href="#" onclick="playAgain()">Spela igen</div>
      <div class="button" href="#" onclick="newPlayers()">Nya spelare</div>
    `;
  }

}