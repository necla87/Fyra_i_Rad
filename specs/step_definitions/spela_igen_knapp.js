import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren är på webbsidan', () => {
  cy.visit('/')
});


Given('användaren skriver i namn', () => {
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Robin' + '{enter}');
});


Given('spelet ska starta', () => {
  cy.get('div.board')
    .should('be.visible');
});


Given('spelet ska visa i text vem som börjar', () => {
  cy.wait(100)
  cy.get('p')
  cy.wait(100)
    .contains('Tara')
});


When('spelarna kör', () => {
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


When('någon har vunnit spelet', () => {
  cy.wait(100)
  cy.get('p')
  cy.wait(100)
    .contains('Tara')
  cy.wait(100)
});


Then('användaren ska kunna trycka på knappen spela igen', () => {
  cy.get('[onclick="playAgain()"]')
});