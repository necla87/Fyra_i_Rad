import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att användaren vill spela online på två skärmar', () => {
  cy.visit('/iframed-network-play.html');
});

When('användaren som vill gå med skriver in en felaktig kod', () => {
  
  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Tara{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then(element => {
    
    let joinCode = element.val();

    
    getIframeBody('iframe#playerO').find('.button.Ja').click();
    getIframeBody('iframe#playerO').find('.button.Gå').click();
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Erika{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type("apa123" + '{enter}')

  });
});

Then('ska ett felmeddalande dyka upp', () => {
  getIframeBody('iframe#playerO').find('dialog:contains("Felaktig gå med kod")').should('exist')
  getIframeBody('iframe#playerO').find('dialog:contains("Felaktig gå med kod")').should('exist')
});
