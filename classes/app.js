import prompt from '../helpers/prompt.js'; 
import GameBoard from './gameBoard.js';
import Player from './players.js';

export default class App {

  constructor() {
  
    while (true) {
      this.createPlayers();
      this.gameBoard = new GameBoard();
      this.startGameLoop();
      this.gameOverScreen();
      console.log('');
      let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
      if (playAgain !== 'ja') { break; }
    }
  }

  createPlayers() {
    console.clear();
    console.log('Fyra i rad\n');

    let playerXname;
    while (!playerXname) {
      playerXname = prompt('Spelare X:s namn: ');
      if (!playerXname) {
        console.log("Du måste skriva i något namn!");
      } else if (/[^a-zA-Z\s]/.test(playerXname)) { 
        console.log("Namnet får inte innehålla siffror eller specialtecken!");
        playerXname = null; 
      }
    }

    let playerOname;
    while (!playerOname) {
      playerOname = prompt('Spelare O:s namn: ');
      if (!playerOname) {
        console.log("Du måste skriva i något namn!");
      } else if (/[^a-zA-Z\s]/.test(playerOname)) { 
        console.log("Namnet får inte innehålla siffror eller specialtecken!");
        playerOname = null; 
      }
    }

    this.playerX = new Player(playerXname, "X");
    this.playerO = new Player(playerOname, "O");

  }

  startGameLoop() {
   
    
     this.gameBoard = new GameBoard();

    while (!this.gameBoard.gameOver) {
      console.clear();
      this.gameBoard.render();
      let player = this.gameBoard.currentPlayerColor === 'X'
        ? this.playerX : this.playerO;
      let move = prompt(
        `Ange ditt drag ${player.color} ${player.name} - välj ett kolumn mellan 1-7: ` 
      );
      
      let [row, column] = move.split(',').map(x => +x.trim() - 1);
      this.gameBoard.makeMove(player.color, row, column);
    }
  }

  gameOverScreen() {
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