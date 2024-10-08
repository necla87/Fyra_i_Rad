import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att vi är två spelare, där en skapar ett spel och den andra ansluter sig', () => {
  cy.visit('/iframed-network-play.html');

 
  getIframeBody('iframe#playerX').find('.button.Ja').click();
  getIframeBody('iframe#playerX').find('.button.Skapa').click();
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Lisa{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val(); 
    cy.wait(1000);

  getIframeBody('iframe#playerO').find('.button.Ja').click();
  getIframeBody('iframe#playerO').find('.button.Gå').click();
  getIframeBody('iframe#playerO').find('input[name="answer"]').type('Lina{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
    cy.wait(1000);

  });
});

When('Spelare 1 lägger sin pjäs i en kolumn', () => {
  getIframeBody('iframe#playerX').find('.board .cell').eq(3).click();
  cy.wait(1000);
});

When('Spelare 2 lägger sin pjäs i en annan kolumn', () => {
  getIframeBody('iframe#playerO').find('.board .cell').eq(6).click();
  cy.wait(1000);

});

When('spelet fortsätter tills en av spelarna får fyra i rad', () => {
  getIframeBody('iframe#playerX').find('.board .cell').eq(3).click();
  cy.wait(1000);
  getIframeBody('iframe#playerO').find('.board .cell').eq(6).click();
  cy.wait(1000);
  getIframeBody('iframe#playerX').find('.board .cell').eq(3).click();
  cy.wait(1000);
  getIframeBody('iframe#playerO').find('.board .cell').eq(6).click();
  cy.wait(1000);
  getIframeBody('iframe#playerX').find('.board .cell').eq(3).click();
  cy.wait(1000);
  
});

Then('spelet ska meddela att vinnaren är den spelare som fick fyra i rad', () => {
  getIframeBody('iframe#playerX').find('p:contains("Lisa vann!")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("Lisa vann!")').should('exist');
});
