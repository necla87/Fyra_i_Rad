# Specifications Fyra_i_Rad


## Board / Detailed Specs
"As a user I want the Board class to manage setting up the board, handle moves on the board, displaying the board and have an opportunity to have a new game in board. If the players got a draw, the game should inform the players via an console.log.
Players should take turns to play the game. If the game is over, the player is not able to continue to play the game.
Player should write the column number (1-7) to place X/O.
It is very uncommon for the players to get a draw, but if it happens the program will console.log the players.
"

### Tested
1.1.Check that the name is not undefined (app.js)
1.2.Should only allow moves for the current player (gameBoard.js)
1.3.Check that the app asks for the players name (app.js)
1.4.Check that the players write a string and not numbers or/and symbols (app.js)
2.1.Check that register the move correctly (gameBoard.js)
3.2.Console.log if a player wins, so players will not be able to continue playing.(gameBoard.js)
5.Should announce a draw when the board is full with no winner (gameBoard.js)
6.Console.log and ask the players if they want to play again, if yes a new game should start from scratch. If no the program should end. (app.js)


#### Problems



##### Not Tested
4.Check who is the winner (gameboard.js)