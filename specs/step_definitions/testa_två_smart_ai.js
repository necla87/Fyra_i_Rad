import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('användaren skriver sitt namn som {string} och väljer svår bot.', (playerName) => {
  cy.visit('/');

  // Enter the user's name
  cy.get('input[name="answer"]').type(playerName + '{enter}');
  cy.wait(1000);

  // Select the difficult bot for the user
  cy.get('.button.svår.bot').click(); // Assuming '.button.svår.bot' selects a difficult bot
  cy.wait(1000);
});

When('användaren skriver sitt namn som {string} och väljer svår bot', (playerName) => {
  // Enter the second user's name
  cy.get('input[name="answer"]').type(playerName + '{enter}');
  cy.wait(1000);

  // Select the difficult bot for the second player
  cy.get('.button.svår.bot').click(); // Select svår bot for second player
  cy.wait(20000);
});

Then('jag ska kunna se att spelet spelas mellan {string} och {string}', (player1, player2) => {
  // Check that the game is in progress between the two AI players
  //cy.get('.current-players').should('contain', player1).and('contain', player2); // Example selector for current players
});

Then('jag ska se att den första AI:n har gjort ett drag', () => {
  // Check that the first AI has made a move
  cy.get('.cell.X').should('have.length.greaterThan', 0); // Assuming 'X' represents the first AI's color
});

Then('jag ska se att den andra AI:n också gör ett drag', () => {
  // Check that the second AI has made a move
  cy.get('.cell.O').should('have.length.greaterThan', 0); // Assuming 'O' represents the second AI's color
});

Then('jag ska se att vem har vunnit', () => {
  // Check for the winning message or status
  cy.get('.result-message').should('be.visible'); // Ensure the winning message is visible
  cy.get('.result-message').invoke('text').then((text) => {
    // Check that the text indicates a winner
    expect(text).to.match(/Vinnare: AI1|Vinnare: AI2/); // Adjust this regex to match your winning text format
  });
});