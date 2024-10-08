import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//ta bort!

Given('att användaren är på startsidan först', () => {
  cy.visit('http://localhost:5500');
});


When('användaren skriver in ett namn och trycker på enter', () => {
  cy.get('input[name="answer"]').type('Tara' + '{enter}');

});


Then('ska användare kunna välja om man vill spela mot en enkel eller en svårt bot', () => {
  cy.get('.dialog-content')
  cy.get('form > .buttons')
    .should('be.visible');
  cy.get('.enkel')
    .should('be.visible');
  cy.get('.svår')
    .should('be.visible');
});