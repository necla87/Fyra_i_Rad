Feature: Registrera korrekt drag på spelbrädet online

  Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet när man spelar online. Det ska kunna visas i två fönster samtidigt på samma skärm.

  Scenario: Starta ett spel online
    Given att användaren kan spela online och det visas i två öppna fönster på samma skärm
    When online spelet startar igång
    Then ska användarens drag registreras korrekt på spelbrädet i båda fönstrerna