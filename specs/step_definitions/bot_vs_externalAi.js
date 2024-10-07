import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getMoveFromExternalAI } from "../../miner.js";

Given('that we start the game between human and smart bot', () => {
  cy.visit('/');
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('.button.Människa').click();
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Sofia' + '{enter}');
  cy.wait(1000);
  cy.get('.button.En.svår.bot').click();
  cy.wait(1000);

});
let memory = '';
When('the external AI plays as human', async () => {

  

  cy.wrap(null).then(async () => {
    cy.log(memory);
    let externalAimove = await getMoveFromExternalAI(1, memory); //level och position
    memory += externalAimove;
    cy.log(externalAimove);
    // Assume externalAimove is a string or move type returned by the AI
    // Here we simulate a move based on AI's move

    cy.get('.cell:nth-child(' + externalAimove + ')').click();
    cy.wait(2000);
    cy.get('body').invoke('attr', 'botMove').then(botMove => {
      memory += (botMove + 1);
    });
    
  });
});




Then('we expect our bot win', () => {
  cy.wait(100);
  cy.get('p');
  cy.wait(100)
    .contains('Tara');
  cy.wait(100);
});