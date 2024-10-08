import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//ta bort!
Given('Användaren skriver sitt namn som "Eva" och väljer Människa.', () => {
  cy.visit('/');

  cy.get('input[name="answer"]').type('Eva' + '{enter}');
  cy.get('.button.Människa').click();
});


When('Användaren skriver sitt namn som "AI" och väljer svår bot.', () => {

  cy.get('input[name="answer"]').type('AI' + '{enter}');
  cy.get('.button.En.svår.bot').click();

});


Then('Eva ska göra det första draget.', () => {
  cy.wait(1000);
  cy.get('.board').find('.cell').eq(1).click();
  cy.wait(1000);
});


Then('AI ska göra ett drag efter Eva.', () => {
  cy.wait(1000);
  cy.get('.board .cell.O').should('exist');

});

Then('AI:s drag ska placeras på en giltig position på spelbrädet.', () => {

  cy.get('.board .cell.O').should('exist').and('have.length.greaterThan', 0); 
  cy.get('.board .cell.O').each(($cell) => {
    cy.wrap($cell).should('not.have.class', 'occupied');
  });

});





