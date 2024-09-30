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
  cy.get(':nth-child(39)').click(); //användaren placerar sin pjäs i kolumn 4
});

Then('spelarna ska lägga sina pjäser inom 3 sekunder', () => {
   
      // Kontrollera att AI:n lägger sin pjäs inom 3 sekunder
      cy.clock(); // Initiera Cypress klockan
 
      cy.get('.cell.X').should('exist');
  
      cy.tick(3000); // Simulera att 3 sekunder går

      // Kontrollera att AI:n har gjort sitt drag
      cy.get('.cell.O').should('exist'); //'.cell.O' CSS-selektorn för AI:s pjäser.
  
});