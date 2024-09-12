import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användare är på start sidan', () => {
  cy.visit('/')
});


When('spelarna har angett sina namn', () => {
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Robin' + '{enter}');
});


When('spelet körs igång', () => {
  cy.get('div.board')
    .should('be.visible');
});


When('det går att se vems tur det är att börja', () => {
  cy.wait(100)
  cy.get('p')
  cy.wait(100)
    .contains('Tara')
});


When('spelets körs igång', () => {
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500)
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500)
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500)
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500)
  cy.get(':nth-child(4) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500)
  cy.get(':nth-child(4) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500)
  cy.get(':nth-child(3) > [onclick="makeMoveOnClick(2)"]').click();
});


When('någon av spelarna får fyra i rad', () => {
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(2)"]')
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(2)"]')
  cy.get(':nth-child(4) > [onclick="makeMoveOnClick(2)"]')
  cy.get(':nth-child(3) > [onclick="makeMoveOnClick(2)"]')
});


Then('ska användaren få möjlighet att kunna välja nya spelare genom att trycka på knappen', () => {
  cy.wait(2000)
  cy.get('[onclick="newPlayers()"]').click();
  cy.wait(100)
});