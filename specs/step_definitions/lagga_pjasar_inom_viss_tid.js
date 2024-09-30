import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren befinner sig på spelsidan', () => {
  cy.visit('/');
});

When('spelaren skriver in ett namn för första spelaren och trycker på enter', () => {
  cy.wait(2000);
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
});

When('väljer knappen Människa', () => {
  cy.get('form > .buttons');
  cy.wait(2000);
  cy.get('.Människa').click();
});

When('spelaren skriver in ett namn för andra spelaren och trycker på enter', () => {
  cy.wait(2000);
  cy.get('input[name="answer"]').type('Erika' + '{enter}');
});

When('väljer knappen svår bot', () => {
  cy.wait(2000);
  cy.get('form > .buttons');
  cy.get('.svår').click();
});

When('spelarna börjar spela mot varandra', () => {
  cy.get('div.board')
    .should('be.visible');
  cy.get(':nth-child(39)').click(); 
});

Then('spelarna ska lägga sina pjäser inom 3 sekunder', () => {
  cy.clock(); 
  cy.get('.cell.X').should('exist');
  cy.tick(3000); 
  cy.get('.cell.O').should('exist');  
});