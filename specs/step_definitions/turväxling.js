import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//ta bort!

Given('att spelet har börjat och användaren har angett sitt namn {string} och {string}', (playerX, playerO) => {
  cy.visit('http://localhost:5500');

  
  cy.get('dialog').find('input[name="answer"]').type(`${playerX}{enter}`);
  cy.wait(1000);

  cy.get('dialog').find('input[name="answer"]').type(`${playerO}{enter}`);
  cy.wait(1000);
});

Given('spelet är i gång.', () => {
  cy.get('main').should('contain.text', 'tur...');
});

When('ANNA placerar sin pjäs på spelplanen', () => {
  cy.get('.board').find('.cell').eq(4).click();
  cy.wait(1000); 
});


Then('ska spelet visa {string}.', (expectedMessage) => {
  cy.get('main').find('p').should('contain.text', expectedMessage);
});


When('OLLE placerar sin pjäs på spelplanen', () => {
  cy.get('.board').find('.cell').eq(1).click();
  cy.wait(1000); 
});

Then('ska spelet ser {string}', (expectedMessage) => {
  cy.get('main').find('p').should('contain.text', expectedMessage);
});
