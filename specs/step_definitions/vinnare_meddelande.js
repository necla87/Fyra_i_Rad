import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//ta bort!
Given('att användaren är inne på hemsidan', () => {
  cy.visit('/');
});


When('spelarna har skrivit in sina namn', () => {
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Robin' + '{enter}');
});


When('spelet startar', () => {
  cy.get('div.board')
    .should('be.visible');
});


When('det går att se vem som ska börja spelet', () => {
  cy.wait(100);
  cy.get('p');
  cy.wait(100)
    .contains('Tara');
});


When('man börjar spela', () => {
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500);
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500);
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500);
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500);
  cy.get(':nth-child(4) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500);
  cy.get(':nth-child(4) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500);
  cy.get(':nth-child(3) > [onclick="makeMoveOnClick(2)"]').click();
});


When('någon av spelarna får fyra i rad och vinner spelet', () => {
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(2)"]');
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(2)"]');
  cy.get(':nth-child(4) > [onclick="makeMoveOnClick(2)"]');
  cy.get(':nth-child(3) > [onclick="makeMoveOnClick(2)"]');
});


Then('då dyker det upp en text där det står vem som har vunnit spelet', () => {
  cy.wait(100);
  cy.get('p');
  cy.wait(100)
    .contains('Tara');
  cy.wait(100);
});
