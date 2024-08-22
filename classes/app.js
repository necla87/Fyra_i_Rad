import prompt from '../helpers/prompt.js'; //behöver ändras till mock-prompt, ska vi göra mappar? Om inte ta bort "helpers"
import gameBoard from './gameBoard.js';
import Player from './players.js';

export default class App {

  constructor() {
    // a while-loop that let us play the game repeatedly
    while (true) {
      this.createPlayers();
      this.gameBoard = new gameBoard();
      this.startGameLoop();
      this.gameOverScreen();
      // ask if we should play again
      console.log('');
      let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
      if (playAgain !== 'ja') { break; }
    }
  }

  createPlayers() {
    console.clear();
    console.log('Fyra i rad\n');
    this.playerX = new Player(prompt('Spelare X:s namn: '), 'X');
    this.playerO = new Player(prompt('Spelare O:s namn: '), 'O');
  }

  startGameLoop() {
    // game loop - runs until the game is over
    while (!this.gameBoard.gameOver) {
      console.clear();
      this.gameBoard.render();
      let player = this.gameBoard.currentPlayerColor === 'X'
        ? this.playerX : this.playerO;
      let move = prompt(
        `Ange ditt drag ${player.color} ${player.name} - välj ett kolumn mellan 1-7: `
      );
      // convert row and columns to numbers and zero-based indexes
      let [row, column] = move.split(',').map(x => +x.trim() - 1);
      // try to make the move
      this.gameBoard.makeMove(player.color, row, column);
    }
  }

  gameOverScreen() {
    // the game is over, tell the player who has one or if we have a draw
    console.clear();
    this.gameBoard.render();
    if (this.gameBoard.winner) {
      let winningPlayer = this.gameBoard.winner === 'X' ? this.playerX : this.playerO;
      console.log(`Grattis ${winningPlayer.color}: ${winningPlayer.name} du har vunnit!`);
    }
    else {
      console.log('Det blev oavgjort!');
    }
  }

}