Feature: Oavgjort Meddelande

  Som användare vill jag se en meddelande om spelet är oavgjort så att jag vet att det inte finns någon vinnare.

  Scenario: När spelet är oavgjort och meddelandet visas
    Given Användaren har öppnat spelsidan
    And Användaren anger ett namn för spelare1 och trycker på enter
    And Användaren anger ett namn för spelare2 och trycker på enter
    When Spelbrädet är fyllt och ingen spelare har vunnit
    Then Ska användaren se en text som säger "Oavgjort..."
