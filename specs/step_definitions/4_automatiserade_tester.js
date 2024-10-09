import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
//OBS! Fixa!
Given('att nätverksspelet är implementerat', () => {
  cy.visit('/iframed-network-play.html');
  //Player X
  getIframeBody('iframe#playerX').find('h2').contains('Online').should('exist'); //dialog
  getIframeBody('iframe#playerX').find('.button.Nej').should('be.visible');
  getIframeBody('iframe#playerX').find('.button.Ja').click().should('exist');
  cy.wait(1000);
  getIframeBody('iframe#playerX').find('h2').contains('Vill du').should('exist'); //dialog
  getIframeBody('iframe#playerX').find('.button.Gå').should('be.visible');
  getIframeBody('iframe#playerX').find('.button.Skapa').click().should('exist');
  cy.wait(1000);
  getIframeBody('iframe#playerX').find('input[name="answer"]').type('Lisa{enter}');
  getIframeBody('iframe#playerX').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val();
    cy.wait(1000);
    //Player O
    getIframeBody('iframe#playerO').find('h2').contains('Online').should('exist'); //dialog
    getIframeBody('iframe#playerO').find('.button.Nej').should('be.visible');
    getIframeBody('iframe#playerO').find('.button.Ja').click().should('exist');
    cy.wait(1000);
    getIframeBody('iframe#playerO').find('h2').contains('Vill du').should('exist'); //dialog
    getIframeBody('iframe#playerO').find('.button.Skapa').should('be.visible');
    getIframeBody('iframe#playerO').find('.button.Gå').click().should('exist');
    cy.wait(1000);
    getIframeBody('iframe#playerO').find('input[name="answer"]').type('Lina{enter}');
    getIframeBody('iframe#playerO').find('dialog:contains("gå med kod") input[name="answer"]')
      .type(joinCode + '{enter}');
    cy.wait(1000);

    //bakgrund, spelbräde och Avsluta knapp visas
    getIframeBody('iframe#playerX').find('main').should('be.visible');
    getIframeBody('iframe#playerX').find('.board').should('be.visible');
    getIframeBody('iframe#playerX').find('div.button').contains('Avsluta').should('exist'); //Avsluta knapp
    getIframeBody('iframe#playerO').find('main').should('be.visible');
    getIframeBody('iframe#playerO').find('.board').should('be.visible');
    
  });

});

When('automatiserade tester körs', () => {
  cy.wait(2000);
  //första spelaren
  getIframeBody('iframe#playerX').find('p:contains("X: Lisa\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("X: Lisa\'s tur...")').should('exist');

  cy.wait(2000);
  //spelarna spelar
  getIframeBody('iframe#playerX').find('.board .cell').eq(1).click();
  cy.wait(2000);

  //andra spelaren
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
  getIframeBody('iframe#playerX').find('div.button').contains('Spela igen').should('exist'); //Spela igen knapp
  getIframeBody('iframe#playerX').find('div.button').contains('Nya spelare').should('exist'); //Nya spelare knapp
});

Then('ska nätverksspelet fungerar korrekt', () => {
  //spela igen
  getIframeBody('iframe#playerX').find('div.button').contains('Spela igen').click();
  getIframeBody('iframe#playerX').find('p:contains("O: Lina\'s tur...")').should('exist');
  getIframeBody('iframe#playerO').find('p:contains("O: Lina\'s tur...")').should('exist');
  
  //spelare X trycker på avsluta och får tre alternativ:
  getIframeBody('iframe#playerX').find('div.button').contains('Avsluta').click();
  getIframeBody('iframe#playerX').find('h2').contains('Vad vill du').should('exist');
  getIframeBody('iframe#playerX').find('.button.Fortsätta').should('exist');
  getIframeBody('iframe#playerX').find('.button.Spela').should('exist');
  getIframeBody('iframe#playerX').find('.button.Nya').should('exist'); 
});