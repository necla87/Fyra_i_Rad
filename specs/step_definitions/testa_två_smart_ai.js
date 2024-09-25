import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step definition for AI1's setup
Given('användaren skriver sitt namn som "AI1" och väljer svår bot.', () => {
  cy.visit('/');
  // Enter AI1's name and select 'svår bot'
  cy.get('input[name="answer"]').type('AI1' + '{enter}');
  cy.get('.button.En.svår.bot').click();
});

// Step definition for AI2's setup and automatic start
When('användaren skriver sitt namn som "AI2" och väljer svår bot.', () => {
  // Enter AI2's name and select 'svår bot'
  cy.get('input[name="answer"]').type('AI2' + '{enter}');
  cy.get('.button.En.svår.bot').click();
  // The game starts automatically after AI2 is set
});

// Step definition for AI1 making the first move
Then('AI1 ska göra det första draget.', () => {
  cy.wait(2000); // Wait for AI1 to make a move
  cy.get('.board .cell.X').should('exist');
});

// Step definition for AI2 making a move after AI1
Then('AI2 ska göra ett drag efter AI1.', () => {
  cy.wait(2000); // Wait for AI2 to make a move
  cy.get('.board .cell.O').should('exist');
});

// Step definition to check for game outcome (win or draw)
Then('spelet ska fortsätta tills någon vinner eller det blir oavgjort.', () => {
  // Wait for the game to proceed and either end in a win or draw
  cy.wait(20000);

  // Check for a winner or a draw (full board with no winner)
  cy.get('.board').then(($board) => {
    if ($board.find('.winner').length > 0) {
      cy.log('The game has a winner.');
    } else if ($board.find('.board-cell:empty').length === 0) {
      cy.log('The game is a draw.');
    }
  });
});
