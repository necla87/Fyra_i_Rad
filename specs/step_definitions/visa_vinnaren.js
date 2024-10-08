import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//ta bort!
Given('att spelet har startat och användaren har angett sitt namn "ANNA" och "OLLE"', () => {
  cy.visit('http://localhost:5500'); 
  cy.get('dialog').find('input[name="answer"]').type('ANNA{enter}');
  cy.wait(1000);

  cy.get('dialog').find('input[name="answer"]').type('OLLE{enter}');
  cy.wait(1000);
});


Given('spelet är i gång', () => {
  cy.get('main').should('exist'); 
});

When('Anna placerar sin bricka på en vinnande position', () => {
  
  cy.get('.board').find('.cell').eq(0).click(); 
  cy.get('.board').find('.cell').eq(1).click();
  cy.get('.board').find('.cell').eq(0).click();
  cy.get('.board').find('.cell').eq(1).click();
  cy.get('.board').find('.cell').eq(0).click();
  cy.get('.board').find('.cell').eq(1).click();
  cy.get('.board').find('.cell').eq(0).click();
});


When('spelet avslutas med en vinnande kombination', () => {
  cy.get('p').should('contain.text', 'vann'); 
});

Then('ska spelet visa {string}', (expectedText) => {
 cy.get('main').find('p').should('contain.text', expectedText); 
});
