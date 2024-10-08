import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att vi är två spelare, där en av oss skapar ett spel medan den andra går med', () => {
  cy.visit('/iframed-network-play.html');


  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Anna{enter}');
  cy.wait(500);

  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    let joinCode = element.val();


    getIframeBody('iframe#playerO').find('.button.Ja').click();
    getIframeBody('iframe#playerO').find('.button.Gå').click();
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Helin{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

When('spelet fortsätter tills Anna vann', () => {
  cy.wait(2000);
  
  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);
  
  getIframeBody('iframe#playerO').find('.board .cell').eq(2).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

  getIframeBody('iframe#playerO').find('.board .cell').eq(2).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

  getIframeBody('iframe#playerO').find('.board .cell').eq(2).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

});

Then('ska "Anna vann!" visas i fönstren för båda spelarna', (a) => {
  getIframeBody('iframe#playerX').find('p:contains("Anna vann!")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("Anna vann!")').should('exist');
});

