import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att vi är två spelare, där en av oss skapar ett spel medan den andra går med.', () => {
  
  cy.visit('/iframed-network-play.html');

  
  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Amy{enter}');
  cy.wait(500);

  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    let joinCode = element.val(); 

    
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

  
  cellsToClick.forEach((cellIndex, i) => {
    const player = i % 2 === 0 ? 'playerX' : 'playerO'; 

    
    getIframeBody(`iframe#${player}`).find('.board .cell').eq(cellIndex).click();

    
    cy.wait(1000); 
  });
});

Then('ska "Oavgjort..." visas i fönstren för båda spelarna.', () => {
  
  getIframeBody('iframe#playerX').find('p:contains("Oavgjort...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("Oavgjort...")').should('exist');
});
