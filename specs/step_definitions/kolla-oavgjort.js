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
  cy.wait(500); cy.get('.board').find('.cell').eq(0).click(); // Cell 0
  cy.wait(500); cy.get('.board').find('.cell').eq(1).click(); // Cell 1
  cy.wait(500); cy.get('.board').find('.cell').eq(2).click(); // Cell 2
  cy.wait(500); cy.get('.board').find('.cell').eq(7).click(); // Cell 7
  cy.wait(500); cy.get('.board').find('.cell').eq(8).click(); // Cell 8
  cy.wait(500); cy.get('.board').find('.cell').eq(9).click(); // Cell 9
  cy.wait(500); cy.get('.board').find('.cell').eq(14).click(); // Cell 14
  cy.wait(500); cy.get('.board').find('.cell').eq(15).click(); // Cell 15
  cy.wait(500); cy.get('.board').find('.cell').eq(16).click(); // Cell 16
  cy.wait(500); cy.get('.board').find('.cell').eq(21).click(); // Cell 21
  cy.wait(500); cy.get('.board').find('.cell').eq(22).click(); // Cell 22
  cy.wait(500); cy.get('.board').find('.cell').eq(23).click(); // Cell 23
  cy.wait(500); cy.get('.board').find('.cell').eq(28).click(); // Cell 28
  cy.wait(500); cy.get('.board').find('.cell').eq(29).click(); // Cell 29
  cy.wait(500); cy.get('.board').find('.cell').eq(30).click(); // Cell 30
  cy.wait(500); cy.get('.board').find('.cell').eq(35).click(); // Cell 35
  cy.wait(500); cy.get('.board').find('.cell').eq(36).click(); // Cell 36
  cy.wait(500); cy.get('.board').find('.cell').eq(37).click(); // Cell 37

});

Then('Ska användaren se en text som säger {string}', (a) => {
  cy.get('main').find('p').contains('Oavgjort...');
});