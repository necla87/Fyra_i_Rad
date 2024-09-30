import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import Network from './helpers/Network.js';
import sleep from './helpers/sleep.js';
import generateCode from './helpers/generateCode.js';

export default class App {

  constructor(playerX, playerO, whoStarts = 'X', networkPlay = false, myColor) {

    // network related properties
    this.networkPlay = networkPlay;
    this.myColor = myColor; // note: only used in network play

    this.dialog = new Dialog();
    this.board = new Board(this);
    this.board.currentPlayerColor = whoStarts;
    this.whoStarts = whoStarts;
    this.setPlayAgainGlobals();
    // replay with existing player
    if (playerX && playerO) {
      this.playerX = playerX;
      this.playerO = playerO;
      // update players so that they know about the new borard
      this.playerX.board = this.board;
      this.playerO.board = this.board;
      // start the new game
      this.namesEntered = true;
      this.board.initiateBotMove();
      // if network play, then replace the listener 
      // (that belongs to the old app / game) with a new one
      if (networkPlay) {
        Network.replaceListener(obj => this.networkListener(obj));
      }
    }
    // enter new players
    else { this.askForNamesAndTypes(); }
    this.render();
  }

  async askIfNetworkPlay() {
    this.networkPlay = (await this.dialog.ask(
      `Online spel: Vill du spela<br>mot en vän via internet?`, ['Ja', 'Nej'])) === 'Ja';
    await sleep(500);
    if (!this.networkPlay) { return; }
    let startNetworkPlay = (await this.dialog.ask(
      'Vill du skapa ett nytt online spel? Eller gå med i en existerande?', ['Skapa', 'Gå med'])) === 'Skapa';
    await sleep(500);
    let name = await this.dialog.ask('Skriv in namn:');
    await sleep(500);
    if (startNetworkPlay) {
      this.myColor = 'X';
      let code = generateCode();
      Network.startConnection(name, code, obj => this.networkListener(obj));
      let extra = '';
      while (!this.bothNetworkPlayersHasJoined) {
        await this.dialog.ask(
          `Send the following join code to your friend:<br>
          <input type="text" name="joinCode" readonly value="${code}">${extra}`, ['OK']);
        extra = '<br>Väntar på att din vän ska gå med...'
        await sleep(500);
      }
    }
    else {
      this.myColor = 'O';
      let extra = '';
      while (!this.bothNetworkPlayersHasJoined) {
        let code = await this.dialog.ask(`Skriv in gå med koden som du fick från din vän:${extra}`);
        this.joiners = [];
        this.enteredJoinCode = code;
        Network.startConnection(name, code, obj => this.networkListener(obj));
        extra = '<br>Felaktig gå med kod... Försök igen...';
        await sleep(500);
      }
    }
    // create players
    this.playerX = new Player(this.joiners.shift(), 'Människa', 'X', this.board);
    this.playerO = new Player(this.joiners.shift(), 'Människa', 'O', this.board);
    this.namesEntered = true;
    this.render();
  }

  networkListener({ user, timestamp, data }) {
    // keep this console.log until you understand how 
    // and which network messages are sent
    console.log(user, timestamp, data);

    // wait for both players to join
    this.joiners = this.joiners || [];
    if (user === 'system' && data.includes('joined channel')) {
      this.joiners.push(data.split(' ')[1]);
      this.bothNetworkPlayersHasJoined = this.joiners.length >= 2;
    }

    // remove dialog/modal for player X when player O has joined
    if (this.myColor === 'X'
      && this.bothNetworkPlayersHasJoined
      && document.querySelector('dialog input[name="joinCode"]')
    ) {
      let okButton = document.querySelector('dialog .button.OK');
      okButton && okButton.click();
    }

    // make move sent to us from opponent via the network
    if (data.color && data.color !== this.myColor) {
      let { color, row, column } = data;
      this.board.makeMove(color, row, column, false) && this.render();
    }

    // if playAgain sent to player O from player X, playAgain
    if (this.myColor === 'O' && data.action === 'playAgain') {
      globalThis.playAgain();
    }
  }

  async askForNamesAndTypes(color = 'X') {
    color === 'X' && await this.askIfNetworkPlay();
    if (this.networkPlay) { return; }
    const okName = name => name.match(/[a-zåäöA-ZÅÄÖ]{2,}/);
    let playerName = '';
    let playerType = '';
    while (!okName(playerName)) {
      playerName = await this.dialog.ask(`Skriv in namn för spelaren ${color}:`);
      if (!this.networkPlay) {
        await sleep(500);
        playerType = await this.dialog.ask(
          `Vilken typ av spelare är ${playerName}?`,
          ['Människa', 'En enkel bot', 'En svår bot']
        )
      }
      else {
        playerType = 'Människa';
      }
    }
    this['player' + color] = new Player(playerName, playerType, color, this.board);
    if (color === 'X' && !this.networkPlay) { this.askForNamesAndTypes('O'); return; }
    this.namesEntered = true;
    this.render();
    this.board.initiateBotMove();
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
      <h1>Fyra i rad</h1>
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

    if (this.networkPlay && this.myColor !== this.board.currentPlayerColor) {
      document.body.classList.add('notMyTurn');
    }
    else {
      document.body.classList.remove('notMyTurn');
    }
  }

  renderQuitButton() {
    if (!this.namesEntered) { return ''; }

    // don't show button for the joining player during network play
    if (this.networkPlay && this.myColor === "O") { return ''; }

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
      // if network  and player X, then send 'playAgain' to player O
      if (this.networkPlay && this.myColor === 'X') {
        Network.send({ action: 'playAgain' });
      }
      new App(this.playerX, this.playerO, playerToStart.color,
        this.networkPlay, this.myColor);
    }
    // start a-fresh with new players
    globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons() {

    // don't show buttons for the joining player during network play
    if (this.networkPlay && this.myColor === 'O') { return ''; }

    // why not use the button element? 
    // div tags are easier to style in a cross-browser-compatible way
    return /*html*/`
      <div class="button" href="#" onclick="playAgain()">Spela igen</div>
      <div class="button" href="#" onclick="newPlayers()">Nya spelare</div>
    `;
  }

}