import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att vi är två spelare, där en av oss skapar ett spel medan den andra går med.', () => {
  // Visit the 'helper' we set up with two iframes
  cy.visit('/iframed-network-play.html');

  // Player X (first player) starts a network game and gets the code
  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Amy{enter}');
  cy.wait(500);

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

When('spelet fortsätter tills brädet är fullt utan vinnare', () => {
  const cellsToClick = [
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    1, 0, 1, 2, 3, 4, 5,
    5, 5, 6, 6, 6, 4, 4,
    3, 3, 2, 0, 2, 1, 0, 1, 0];

  // Alternate clicks for Player X and Player O
  cellsToClick.forEach((cellIndex, i) => {
    const player = i % 2 === 0 ? 'playerX' : 'playerO'; // Determine current player

    // Player places a piece by clicking on the cell
    getIframeBody(`iframe#${player}`).find('.board .cell').eq(cellIndex).click();

    // Optional: Wait for the game state to update (for better stability)
    cy.wait(1000); // Adjust as needed based on how your game updates
  });
});

Then('ska "Oavgjort..." visas i fönstren för båda spelarna.', () => {
  // Check if the draw message is displayed for both players
  getIframeBody('iframe#playerX').find('p:contains("Oavgjort...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("Oavgjort...")').should('exist');
});
