import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('att användaren befinner sig på spelsidan', () => {
  // TODO: implement step
  cy.visit('/');
});

When('spelaren skriver in ett namn för första spelaren och trycker på enter', () => {
  // TODO: implement step
  // Ange namn och välj enkel bot för första spelaren
  cy.get('input[name="answer"]').type('Tara' + '{enter}');
});

When('väljer enkel bot', () => {
  // TODO: implement step
  cy.get('form > .buttons');
  cy.get('.enkel').click();
});

When('spelaren skriver in ett namn för andra spelaren och trycker på enter', () => {
  // TODO: implement step
  cy.get('input[name="answer"]').type('Erika' + '{enter}');
});

When('väljer svår bot', () => {
  // TODO: implement step
  cy.get('form > .buttons');
  cy.get('.svår').click();
});

When('spelarna som är AI botar börjar spela mot varandra', () => {
  // TODO: implement step
  cy.get('div.board')
    .should('be.visible');
});

Then('AI spelarna ska lägga sina pjäser inom 3 sekunder', () => {
  // TODO: implement step
  //it- är ett sätt att testa en specifik funktion i koden och kollar det som förväntas göras

  //describe('Fyra i rad - AI-botar lägger sina pjäser inom viss tid', () => {

    const AI_MOVE_TIME_LIMIT = 3000; // 3 sekunder

    it('AI-botar ska lägga sina pjäser inom en viss tid', () => {


      // Kontrollera att AI lägger pjäser inom tidsgränsen
      cy.get('.last-move').should('be.visible').and(($move) => {
        // Kontrollera att draget sker inom 3 sekunder
        cy.wrap($move).should('exist');
        cy.wait(AI_MOVE_TIME_LIMIT);
      });
    });
 // });

});