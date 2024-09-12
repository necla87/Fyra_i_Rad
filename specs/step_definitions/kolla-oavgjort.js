import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Användaren har öppnat spelsidan', () => {
  cy.visit('/');
});

Given('Användaren anger ett namn för spelare1 och trycker på enter', () => {
  cy.get('dialog').find('input[name="answer"]').type('spelare1{enter}');
  cy.wait(1000);
});

Given('Användaren anger ett namn för spelare2 och trycker på enter', () => {
  cy.get('dialog').find('input[name="answer"]').type('spelare2{enter}');
  cy.wait(1000);
});

When('Spelbrädet är fyllt och ingen spelare har vunnit', () => {
 
  const cellsToClick = [
    0, 0, 0, 0, 0, 0, 
    1, 1, 1, 1, 1, 1, 
    2, 2, 2, 2, 2, 2, 
    4, 3, 3, 3, 3, 3, 
    3, 4, 4, 4, 4, 4, 
    5, 5, 5, 5, 5, 5, 
    6, 6, 6, 6, 6, 6  
  ];

  cellsToClick.forEach((cellIndex, i) => {
    cy.wait(500); 
    cy.get('.board').find('.cell').eq(cellIndex).click();
  });
});


Then('Ska användaren se en text som säger {string}', (expectedText) => {
  
  cy.get('main').find('p').should('contain.text', expectedText);
});