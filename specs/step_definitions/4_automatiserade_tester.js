import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att vi är två spelare, där en spelare bjuder in ett spel och den andra vill gå med', () => {
  cy.visit('/iframed-network-play.html');

  getIframeBody('iframe#playerX').find('h2').contains('Online').should('exist');
  getIframeBody('iframe#playerX').find('.button.Nej').should('be.visible');
  getIframeBody('iframe#playerX').find('.button.Ja').click().should('exist');
  cy.wait(1000);
  getIframeBody('iframe#playerX').find('h2').contains('Vill du').should('exist');
  getIframeBody('iframe#playerX').find('.button.Gå').should('be.visible');
  getIframeBody('iframe#playerX').find('.button.Skapa').click().should('exist');
  cy.wait(1000);
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Lisa{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val();
    cy.wait(1000);

    getIframeBody('iframe#playerO').find('h2').contains('Online').should('exist');
    getIframeBody('iframe#playerO').find('.button.Nej').should('be.visible');
    getIframeBody('iframe#playerO').find('.button.Ja').click().should('exist');
    cy.wait(1000);
    getIframeBody('iframe#playerO').find('h2').contains('Vill du').should('exist');
    getIframeBody('iframe#playerO').find('.button.Skapa').should('be.visible');
    getIframeBody('iframe#playerO').find('.button.Gå').click().should('exist');
    cy.wait(1000);
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Lina{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
    cy.wait(1000);



    getIframeBody('iframe#playerX').find('main').should('be.visible');
    getIframeBody('iframe#playerX').find('.board').should('be.visible');
    getIframeBody('iframe#playerX').find('div.button').contains('Avsluta').should('exist');
    getIframeBody('iframe#playerO').find('main').should('be.visible');
    getIframeBody('iframe#playerO').find('.board').should('be.visible');

  });

});

When('spelet är igång tills en av spelarna vinner', () => {
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('p:contains("X: Lisa\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("X: Lisa\'s tur...")').should('exist');

  cy.wait(2000);

  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('p:contains("O: Lina\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("O: Lina\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('.board .cell').eq(2).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

  getIframeBody('iframe#playerO').find('.board .cell').eq(2).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

  getIframeBody('iframe#playerO').find('.board .cell').eq(2).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

  getIframeBody('iframe#playerX').find('p:contains("Lisa vann!")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("Lisa vann!")').should('exist');
  getIframeBody('iframe#playerX').find('div.button').contains('Spela igen').should('exist');
  getIframeBody('iframe#playerX').find('div.button').contains('Nya spelare').should('exist');
});

Then('då kan spelare välja att spela igen eller avsluta', () => {

  getIframeBody('iframe#playerX').find('div.button').contains('Spela igen').click();
  getIframeBody('iframe#playerX').find('p:contains("O: Lina\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("O: Lina\'s tur...")').should('exist');

  getIframeBody('iframe#playerX').find('div.button').contains('Avsluta').click();
  getIframeBody('iframe#playerX').find('h2').contains('Vad vill du').should('exist');
  getIframeBody('iframe#playerX').find('.button.Fortsätta').should('exist');
  getIframeBody('iframe#playerX').find('.button.Spela').should('exist');
  getIframeBody('iframe#playerX').find('.button.Nya').should('exist');
});