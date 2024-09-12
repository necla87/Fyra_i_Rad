import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Oyunun başladığını ve isimlerin girildiğini simüle eder
Given('att spelet har börjat och användaren har angett sitt namn {string} och {string}', (playerX, playerO) => {
  cy.visit('http://localhost:5500');

  // Oyuncu isimlerini girin ve enter'a basın
  cy.get('dialog').find('input[name="answer"]').type(`${playerX}{enter}`);
  cy.wait(1000);

  cy.get('dialog').find('input[name="answer"]').type(`${playerO}{enter}`);
  cy.wait(1000);
});

// Oyunun başladığını doğrular
Given('spelet är i gång.', () => {
  cy.get('main').should('contain.text', 'tur...');
});

// Anna'nın taşını koymasını simüle eder
When('ANNA placerar sin pjäs på spelplanen', () => {
  // Anna'nın taşını koymak için bir alan seçin ve tıklayın
  cy.get('.board').find('.cell').eq(4).click();
  cy.wait(1000); // İşlem tamamlandığında bekleme
});

// Oyunun doğru mesajı gösterdiğini doğrular
Then('ska spelet visa {string}.', (expectedMessage) => {
  cy.get('main').find('p').should('contain.text', expectedMessage);
});

// Olle'nin taşını koymasını simüle eder
When('OLLE placerar sin pjäs på spelplanen', () => {
  // Olle'nin taşını koymak için bir alan seçin ve tıklayın
  cy.get('.board').find('.cell').eq(1).click();
  cy.wait(1000); // İşlem tamamlandığında bekleme
});

// Oyunun doğru mesajı gösterdiğini doğrular
Then('ska spelet ser {string}', (expectedMessage) => {
  cy.get('main').find('p').should('contain.text', expectedMessage);
});
