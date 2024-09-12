import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användare är på första sidan', () => {
   cy.visit('/')
});


When('spelarna har skrivit sina namn', () => {
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Robin' + '{enter}');
});


When('spelet går igång', () => {
  cy.get('div.board')
    .should('be.visible');
});


When('det går att se vem tur det är att börja', () => {
  cy.wait(100)
  cy.get('p')
  cy.wait(100)
    .contains('Tara')
});


When('man börjar spela spelet', () => {
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500)
  cy.get(':nth-child(6) > [onclick="makeMoveOnClick(3)"]').click();
  cy.wait(500)
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(2)"]').click();
  cy.wait(500)
  cy.get(':nth-child(5) > [onclick="makeMoveOnClick(3)"]').click();
});


When('spelaren trycker på avsluta under spelets gång', () => {
  cy.wait(500)
  cy.get('.button').click();
  cy.wait(100)
});


Then('ska spelaren få alternativet att trycka på knappen fortsätta', () => {
  cy.wait(2000)
  cy.get('.Fortsätta').click();
});