import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Användaren har laddat spelsidan', () => {
  cy.visit('/');
});

Given('Användaren har spelat ett spel och spelet är över', () => {

  cy.get('dialog').find('input[name="answer"]').type('Maria{enter}');
  cy.wait(1000);
  cy.get('dialog').find('input[name="answer"]').type('Tony{enter}');
  cy.wait(1000);

  cy.get('.board').find('.cell').eq(1).click();
  cy.get('.board').find('.cell').eq(2).click();
  cy.get('.board').find('.cell').eq(1).click();
  cy.get('.board').find('.cell').eq(2).click();
  cy.get('.board').find('.cell').eq(1).click();
  cy.get('.board').find('.cell').eq(2).click();
  cy.get('body').should('have.attr', 'gameinprogress', 'true');
  cy.get('.board').find('.cell').eq(1).click(); 
});

When('Användaren försöker lägga en ny pjäs', () => {
  cy.get('.board').click({ force: true });
});

Then('Ska inga fler pjäser kunna läggas på spelbrädet', () => {
  cy.get('body').should('have.attr', 'gameinprogress', 'false');
});
