import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren är på startsidan', () => {
  // TODO: implement step
  cy.visit('/')
  
  
});

When('användaren ska skriva in sina namn', () => {
  // TODO: implement step
  //behöver man skapa en class eller id?
  //ändra #input
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
  cy.wait(1000);
  cy.get('input[name="answer"]').type('Robin' + '{enter}');
});

Then('ska användarens namn registreras och sparas', () => {
  // TODO: implement step
  //FRÅGA
});

Then('spelet ska starta igång', () => {
  // TODO: implement step
  cy.get('div.board')
    .should('be.visible'); 
});

Then('spelet ska visa i text vems tur det är att börja', () => {
  // TODO: implement step
  cy.wait(100)
  cy.get('p')
  .contains('Tara')
});