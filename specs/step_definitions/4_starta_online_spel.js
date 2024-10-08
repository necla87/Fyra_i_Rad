import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att användaren är på huvudsidan för Fyra i Rad', () => {
  cy.visit('/iframed-network-play.html');
});

When('användaren väljer att spela online', () => {

  getIframeBody('iframe#playerX').find('.button.Ja').click();
 
  });

When('användaren väljer att {string}', (a) => {

  getIframeBody('iframe#playerX').find('.button.Skapa').click();
});

When('användaren skriver in sitt namn som {string}', (a) => {

  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Spelare1{enter}');
  cy.wait(500);
});

Then('ska användaren få en gå med-kod att skicka till sin vän', () => {
  
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    let joinCode = element.val();

    getIframeBody('iframe#playerX').find('.button.OK').click();
  });
});

Then('användaren ska se att spelet väntar på att en vän ska gå med', () => {
   
  getIframeBody('iframe#playerX').contains('Väntar på att din vän ska gå med...').should('be.visible');
  });
