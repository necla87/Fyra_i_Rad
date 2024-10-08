import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
//ta bort!

Given('Användaren navigerar till spelsidan', function () {
  cy.visit('/');
});


Given('Användaren skriver in ett namn för spelare1 och klickar på enter', function () {
  cy.get('dialog').find('input[name="answer"]').type('spelare1{enter}');
  cy.wait(1000);
});


Given('Användaren skriver in ett namn för spelare2 och klickar på enter', function () {
  cy.get('dialog').find('input[name="answer"]').type('spelare2{enter}');
  cy.wait(1000);
});


When('Spelare1 klickar på kolumn 3 för att placera sin bricka', function () {
  cy.get('.board').find('.cell').eq(2).click(); 
});


Then('Bör brickan placeras i den lägsta tillgängliga raden i kolumn 3', function () {
  
  cy.get('.board')
    .find('.cell')
    .filter(':nth-child(3)') 
    .filter(':not(:empty)') 
    .last() 
    .should('have.class', 'X'); 
});
