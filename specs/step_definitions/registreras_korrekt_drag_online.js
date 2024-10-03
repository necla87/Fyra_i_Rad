import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren har två fönster öppna samtidigt som visar hemsidan', () => {
  cy.visit('/iframed-network-play.html');
});

Given('att användaren ska kunna se en text där det står {string}', (a) => {
  cy.get('dialog').find('h2').contains('Online');
});

When('användaren väljer att spela online genom att trycka på {string} knappen på båda fönstrerna', (a) => {
  cy.wait(1000);
  cy.get('.Ja').should('be.visible').click();
});

When('användaren väljer att trycka på {string} knappen i fönsta fönstret', (a) => {
  cy.wait(1000);
  cy.get('.Skapa').should('be.visible').click();
});

When('användaren som vill skapa ett spel skriver in sitt spel namn och trycker på enter', () => {
  cy.wait(1000);
  cy.get('dialog').contains('Skriv in namn:');
  cy.get('input').type('Tara' + '{enter}');
});

When('en text dyker upp med en generad kod som din vän ska skriva in', () => {
  cy.wait(1000);
  cy.get('dialog').contains('Skicka följande');
  cy.get('h2 > input');
});

When('trycker på {string} knappen', (a) => {
  cy.get('.button').should('be.visible').contains('OK');
});


When('användaren väljer att trycka på {string} knappen i andra fönstret', (a) => {

});

When('användaren som vill joina skriver in sitt spel namn och trycker på enter', () => {
  // TODO: implement step
});

When('skriver in vän koden', () => {
  // TODO: implement step
});

Then('ska man kunna starta spelet', () => {
  // TODO: implement step
});

Then('användaren ska kunna se vems tur det är att spela först', () => {
  // TODO: implement step
});

Then('användaren gör ett drag', () => {
  // TODO: implement step
});

Then('det ska registreras och visas på båda fönsterna', () => {
  // TODO: implement step
});