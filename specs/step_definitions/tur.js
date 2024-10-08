import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att vi är två spelare och en skapar ett spel och en går med i spelet', () => {
  // Visit the 'helper' we set up with two iframes
  cy.visit('/iframed-network-play.html');

  // Player X (first player) starts a network game and gets the code
  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Amy{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    let joinCode = element.val(); // Get the join code

    // Player O (second player) joins the game using the code
    getIframeBody('iframe#playerO').find('.button.Ja').click();
    getIframeBody('iframe#playerO').find('.button.Gå').click();
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Tim{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

Then('två spelare ska se att det är första spelarens tur', () => {
  // Wait for the UI to update
  cy.wait(2000);

  // Expect both players to have 'X: Amy's tur...' displayed on their screens
  getIframeBody('iframe#playerX').find('p:contains("X: Amy\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("X: Amy\'s tur...")').should('exist');
});

When('Spelare 1 lägger sin pjäs i kolumn {int}', (columnIndex) => {
  // Player X (Amy) makes a move in the specified column
  getIframeBody('iframe#playerX').find('.board .cell').eq(columnIndex).click();
  cy.wait(2000); // Wait for the game state to update
});

Then('ska "O: Tim\'s tur..." visas i två fönstren', () => {
  // Check if it's now Player O's (Tim's) turn in both iframes
  getIframeBody('iframe#playerX').find('p:contains("O: Tim\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("O: Tim\'s tur...")').should('exist');
});

When('Spelare 2 lägger sin pjäs i kolumn {int}', (columnIndex) => {
  // Player O (Tim) makes a move in the specified column
  getIframeBody('iframe#playerO').find('.board .cell').eq(columnIndex).click();
  cy.wait(2000); // Wait for the game state to update
});

Then('ska "X: Amy\'s tur..." visas i båda fönstren', () => {
  // Check if it's now Player X's (Amy's) turn in both iframes
  getIframeBody('iframe#playerX').find('p:contains("X: Amy\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("X: Amy\'s tur...")').should('exist');
});
