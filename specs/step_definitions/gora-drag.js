import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Step: Navigera till spelsidan
Given('Användaren navigerar till spelsidan', function () {
  cy.visit('/');
});

// Step: Skriv in ett namn för spelare1 och klicka på enter
Given('Användaren skriver in ett namn för spelare1 och klickar på enter', function () {
  cy.get('dialog').find('input[name="answer"]').type('spelare1{enter}');
  cy.wait(1000);
});

// Step: Skriv in ett namn för spelare2 och klicka på enter
Given('Användaren skriver in ett namn för spelare2 och klickar på enter', function () {
  cy.get('dialog').find('input[name="answer"]').type('spelare2{enter}');
  cy.wait(1000);
});

// Step: Spelare1 klickar på kolumn 3 för att placera sin bricka
When('Spelare1 klickar på kolumn 3 för att placera sin bricka', function () {
  cy.get('.board').find('.cell').eq(2).click(); // Assuming the cells are ordered from 0 to 6
});

// Step: Bör brickan placeras i den lägsta tillgängliga raden i kolumn 3
Then('Bör brickan placeras i den lägsta tillgängliga raden i kolumn 3', function () {
  // Check if the disc is placed in the correct column and row
  cy.get('.board')
    .find('.cell')
    .filter(':nth-child(3)') // Filter by column (3rd column is index 2)
    .filter(':not(:empty)') // Find non-empty cells
    .last() // Get the last filled cell
    .should('have.class', 'X'); // Verify the cell has the class 'X' for player 1
});
