import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att användaren är på onlinesidan', () => {
  cy.visit('/iframed-network-play.html');
});

Given('att spelet är slut', () => {
  cy.get('.gameover')
    .should('be.visible');
});

Given('båda spelarna vill spela igen', () => {
  cy.get('[onclick="playAgain()"]').should('be.visible');
});


When('spelet startas om', () => {

  cy.get('div.board')
    .should('be.visible');
});


Then('ska ett nytt spel börja', () => {

});
// TODO: implement step
