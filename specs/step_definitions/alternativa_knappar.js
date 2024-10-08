import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//ta bort!
Given('att användaren är på webb sidan', () => {
  cy.visit('/');
});

When('spelarna har angivit sina namn för att spela', () => {
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Robin' + '{enter}');
});

When('spelet startas', () => {
  cy.get('.board');
  cy.get('div.board')
    .should('be.visible');
});

When('det går att se vem ska börja köra', () => {
  cy.wait(100);
  cy.get('p');
  cy.wait(100)
    .contains('Tara');
});

When('man börjar med att spela', () => {
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500)
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500)
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500)
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(3)"]').click();
});

Then('ska användaren kunna trycka på avsluta knappen under spelets gång', () => {
  cy.wait(1000);
  cy.get('.button').click();
  cy.wait(100);
});

Then('användaren ska få upp tre alternativa knappar att välja', () => {
  cy.wait(2000);
  cy.get('.dialog-content');
  cy.get('form > .buttons');
  cy.get('.Fortsätta').should('be.visible');
  cy.get('.Spela').should('be.visible');
  cy.get('.Nya').should('be.visible');
});