import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren är på startsidan först', () => {
  // TODO: implement step
  cy.visit('/');
});

When('användaren skriver in ett namn', () => {
  // TODO: implement step
  cy.get('input[name="answer"]').type('Tara');

});

When('trycker på enter', () => {
  // TODO: implement step
  cy.type('{enter}');
  cy.wait(500);
});

Then('ska användare kunna välja om man vill spela mot en enkel eller en svårt bot', () => {
  // TODO: implement step
});