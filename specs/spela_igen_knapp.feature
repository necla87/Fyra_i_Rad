Feature: Trycka på knappen spela igen

    Som användare vill jag kunna trycka på knappen spela igen efter ett avslutat spel.


    Scenario: Spela igen knapp
    Given att användaren är på webbsidan 
    And användaren skriver i namn
    And spelet ska starta 
    And spelet ska visa i text vem som börjar
    When spelarna kör
    And någon har vunnit spelet
    Then användaren ska kunna trycka på knappen spela igen 
