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
      playerName = await this.dialog.ask(`Skriv in namn för ${color === 'X' ? 'spelare 1' : 'spelare 2'}:`);

      // Capitalize the first letter and make the rest lowercase
      playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

      await sleep(500);
    }
    this['player' + color] = new Player(playerName, color);
    if (color === 'X') {
      this.askForNames('O');
      return;
    }
    this.namesEntered = true;
    this.render();
  }



  namePossesive(name) {
    return name + (name.slice(-1).toLowerCase() !== 's' ? 's' : '') + ' tur...';
  }

  render() {
    let color = this.board.currentPlayerColor;
    let player = color === 'X' ? this.playerX : this.playerO;
    let name = player?.name || '';

    document.querySelector('main').innerHTML = /*html*/`
    <h1><span class="big-number">4</span> i rad</h1>
    ${!this.board.gameOver && player ?
        `<p>${this.namePossesive(name)}</p>` 
        : (this.namesEntered ? '' : '<p>Skriv in namn</p>')}
    ${!this.board.gameOver ? '' : /*html*/`
      ${!this.board.isADraw ? '' : `<p>Oavgjort...</p>`}
      ${!this.board.winner ? '' : `<p>${name} vann!</p>`} <!-- Updated winner message -->
    `}
    ${this.board.render()}
    <div class="buttons">
      ${!this.board.gameOver ? this.renderQuitButton() : this.renderPlayAgainButtons()}
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
    globalThis.playAgain = async () => {
      // Determine which player will start
      let playerToStart = this.whoStarts === 'X' ? this.playerO : this.playerX;

      // Display the message with the player's name and role
      await this.dialog.ask(
        `Det är ${playerToStart.name}s tur att starta som ${playerToStart.color === 'X' ? 'Spelare 1' : 'Spelare 2'}!`,
        ['OK']
      );

      // Start a new game with the current players
      new App(this.playerX, this.playerO, playerToStart.color);
    };

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