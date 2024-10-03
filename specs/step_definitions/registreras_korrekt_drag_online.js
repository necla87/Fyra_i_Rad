import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Problem med iframes när man vill åt specifika cy.get()
//Hur ska vi få iframes att funka med testerna?
Given('att användaren har två fönster öppna samtidigt som visar hemsidan', () => {
  //cy.visit('/iframed-network-play.html'); //kommenterar ut tills vi löser problemet
  cy.visit('/');
});

Given('att användaren ska kunna se en text där det står {string}', (a) => {
  cy.get('dialog').find('h2').contains('Online');
});

When('användaren väljer att spela online genom att trycka på {string} knappen på båda fönstrerna', (a) => {
  cy.wait(2000);
  cy.get('.Ja').should('be.visible').click();
});

When('användaren väljer att trycka på {string} knappen i fönsta fönstret', (a) => {
  cy.wait(2000);
  cy.get('.Skapa').should('be.visible').click();
});

When('användaren som vill skapa ett spel skriver in sitt spel namn och trycker på enter', () => {
  cy.wait(2000);
  cy.get('dialog').contains('Skriv in namn:');
  cy.get('input').type('Tara' + '{enter}');
});

When('en text dyker upp med en generad kod som din vän ska skriva in', () => {
  cy.wait(2000);
  cy.get('dialog').contains('Skicka följande');
  cy.get('h2 > input');
});

When('trycker på {string} knappen', (a) => {
  cy.get('.button').should('be.visible').contains('OK');
});

// //denna del funkar inte då det är problem med iframes
// When('användaren väljer att trycka på {string} knappen i andra fönstret', (a) => {
//   cy.wait(2000);
//   cy.get('.Gå').should('be.visible').click();
// });

// When('användaren som vill joina skriver in sitt spel namn och trycker på enter', () => {
//   cy.wait(2000);
//   cy.get('input').type('Erika' + '{enter}');
// });

// When('skriver in vän koden', () => {
//   // TODO: implement step
// });

// Then('ska man kunna starta spelet', () => {
//   cy.get('body').should('be.visible');
// });

// Then('användaren ska kunna se vems tur det är att spela först', () => {
//   cy.wait(100);
//   cy.get('p');
//   cy.wait(100)
//   .contains('Tara');
//   cy.wait(100);
// });

// Then('användaren gör ett drag', () => {
//   // TODO: implement step
//   cy.get('div.board').should('be.visible');
//   cy.get(':nth-child(39)').click();
// });

// Then('det ska registreras och visas på båda fönsterna', () => {
//   // TODO: implement step
// });