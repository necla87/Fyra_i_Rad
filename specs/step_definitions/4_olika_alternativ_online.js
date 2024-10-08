import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren är på första sidan av spelet Fyra i rad', () => {
  cy.visit('/');
});

Given('det dyker upp en text som frågar om användaren vill spela online', () => {
  cy.wait(2000);
  cy.get('h2').contains('Online').should('be.visible');
});

Given('det finns en Ja- och Nej knapp', () => {
  cy.wait(2000);
  cy.get('form > .buttons');
  cy.get('.Ja').should('be.visible');
  cy.get('.Nej').should('be.visible');
});

When('användaren trycker på Ja knappen', () => {
  cy.get('.Ja').should('be.visible').click();
});

Then('så finns det möjlighet att Skapa ett spel eller gå med i ett existerande spel', () => {
  cy.wait(2000);
  cy.get('form > .buttons').should('be.visible')
  cy.get('.Skapa').should('be.visible');
  cy.get('.Gå').should('be.visible');
});