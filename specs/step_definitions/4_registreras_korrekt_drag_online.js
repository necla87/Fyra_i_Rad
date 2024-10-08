import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att användaren kan spela online och det visas i två öppna fönster på samma skärm', () => {
  cy.visit('/iframed-network-play.html');

  
  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Tara{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then(element => {
    
    let joinCode = element.val();

    
    getIframeBody('iframe#playerO').find('.button.Ja').click();
    getIframeBody('iframe#playerO').find('.button.Gå').click();
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Erika{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

When('online spelet startar igång', () => {
  getIframeBody('iframe#playerX').find('p:contains("X: Tara\'s tur...")').should('be.visible');
  getIframeBody('iframe#playerO').find('p:contains("X: Tara\'s tur...")').should('be.visible');
});

Then('ska användarens drag registreras korrekt på spelbrädet i båda fönstrerna', () => {
  getIframeBody('iframe#playerX').find('div.cell:nth-child(39)').click();
  getIframeBody('iframe#playerO').find('div.cell:nth-child(39)').should('be.visible');
  cy.wait(1000)
  getIframeBody('iframe#playerO').find('div.cell:nth-child(38)').click();
  getIframeBody('iframe#playerX').find('div.cell:nth-child(38)').should('be.visible');
});