import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
//OBS! Fixa!
Given('att nätverksspelet är implementerat', () => {
  cy.visit('/iframed-network-play.html');
  //Player X
  getIframeBody('iframe#playerX').find('h2').contains('Online').should('exist');
  getIframeBody('iframe#playerX').find('.button.Ja').click().should('exist');
  getIframeBody('iframe#playerX').find('.button.Skapa').click().should('exist');
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Lisa{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val();
    cy.wait(1000);
    //Player O
    getIframeBody('iframe#playerO').find('h2').contains('Online').should('exist');
    getIframeBody('iframe#playerO').find('.button.Ja').click().should('exist');
    getIframeBody('iframe#playerO').find('.button.Gå').click().should('exist');
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Lina{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
    cy.wait(1000);

  });

});

When('automatiserade tester körs', () => {
  // TODO: implement step
});

Then('ska nätverksspelet fungerar korrekt', () => {
  // TODO: implement step
});