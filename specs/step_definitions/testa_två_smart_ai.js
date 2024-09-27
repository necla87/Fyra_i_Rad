import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('användaren skriver sitt namn som "AI1" och väljer svår bot.', () => {
  cy.visit('/');
 
  cy.get('input[name="answer"]').type('AI1' + '{enter}');
  cy.get('.button.En.svår.bot').click();
});


When('användaren skriver sitt namn som "AI2" och väljer svår bot.', () => {
  
  cy.get('input[name="answer"]').type('AI2' + '{enter}');
  cy.get('.button.En.svår.bot').click();
  
});


Then('AI1 ska göra det första draget.', () => {
  cy.wait(1000); 
  cy.get('.board .cell.X').should('exist');
});


Then('AI2 ska göra ett drag efter AI1.', () => {
  cy.wait(1000); 
  cy.get('.board .cell.O').should('exist');
 
});

Then('spelet ska fortsätta tills någon vinner eller det blir oavgjort.', () => {
  cy.wait(18000);
  cy.get('p').should('be.visible').then(($p) => {
    const resultText = $p.text();

    
    if (resultText.includes('oavgjort')) {
      cy.log('Game ended in a draw.');
      cy.wrap($p).should('contain', 'Det blev oavgjort...');
    } else if (resultText.includes('vann')) {
      cy.log('A player has won the game.');
      cy.wrap($p).should('contain', 'vann');
    } else {
      throw new Error('Result text does not indicate a win or draw.');
    }
  });
});
  
