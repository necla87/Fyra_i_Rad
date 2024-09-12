import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren är på startsidan', () => {
  cy.visit('/') 
});


When('användaren ska skriva in sina namn', () => {
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Robin' + '{enter}');
});


Then('spelet ska starta igång', () => {
  cy.get('div.board')
    .should('be.visible'); 
});


Then('spelet ska visa i text vems tur det är att börja', () => {
  cy.wait(100)
  cy.get('p')
  cy.wait(100)
  .contains('Tara')
});