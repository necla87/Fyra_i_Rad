import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att vi är två spelare och en skapar ett spel och en går med i spelet', () => {
  
  cy.visit('/iframed-network-play.html');

  
  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Amy{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    let joinCode = element.val(); 

    
    getIframeBody('iframe#playerO').find('.button.Ja').click();
    getIframeBody('iframe#playerO').find('.button.Gå').click();
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Tim{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

Then('två spelare ska se att det är första spelarens tur', () => {
  
  cy.wait(2000);

  
  getIframeBody('iframe#playerX').find('p:contains("X: Amy\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("X: Amy\'s tur...")').should('exist');
});

When('Spelare 1 lägger sin pjäs i kolumn {int}', (columnIndex) => {
  
  getIframeBody('iframe#playerX').find('.board .cell').eq(columnIndex).click();
  cy.wait(2000); 
});

Then('ska "O: Tim\'s tur..." visas i två fönstren', () => {
  
  getIframeBody('iframe#playerX').find('p:contains("O: Tim\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("O: Tim\'s tur...")').should('exist');
});

When('Spelare 2 lägger sin pjäs i kolumn {int}', (columnIndex) => {
  
  getIframeBody('iframe#playerO').find('.board .cell').eq(columnIndex).click();
  cy.wait(2000); 
});

Then('ska "X: Amy\'s tur..." visas i båda fönstren', () => {
  
  getIframeBody('iframe#playerX').find('p:contains("X: Amy\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("X: Amy\'s tur...")').should('exist');
});
