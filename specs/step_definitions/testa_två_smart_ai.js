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
  cy.wait(15000);
});

// Step definition to check for game outcome (win or draw)
Then('spelet ska fortsätta tills någon vinner eller det blir oavgjort.', () => {
  cy.get('p').should('be.visible').then(($p) => {
    const resultText = $p.text();

    // Verify the result text includes either "vann" or "oavgjort"
    if (resultText.includes('oavgjort')) {
      cy.log('Game ended in a draw.');
      cy.wrap($p).should('contain', 'Det blev oavgjort...');
    } else if (resultText.includes('vann')) {
      cy.log('A player has won the game.');
      cy.wrap($p).should('contain', 'vann');
    } else {
      throw new Error('Result text does not indicate a win or draw.');
    }
  });
});
  
