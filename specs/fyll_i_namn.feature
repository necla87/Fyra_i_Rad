Feature: Skriv in spelarnas namn

    Som användare ska man kunna skriva in sina namn i spelet


    Scenario: Användare ska kunna skriva in sina namn i rutan
    Given att användaren är på startsidan
    When användaren ska skriva in sina namn
    Then ska användarens namn registreras och sparas 
    And spelet ska starta igång
    And spelet ska visa i text vems tur det är att börja