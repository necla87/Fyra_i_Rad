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

When('the external AI plays as human', async () => {
  cy.wrap(null).then(async () => {
    let externalAimove = await getMoveFromExternalAI(1, ""); 
    console.log(externalAimove);
  })
  
});

Then('we expect our bot win', () => {
  // TODO: implement step
});