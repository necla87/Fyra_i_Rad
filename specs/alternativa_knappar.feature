Feature: Alternativa knappar

    Som användare ska man kunna välja få möjlighet att välja mellan tre olika knappar efter att vi tryckt på avsluta.


    Scenario: Olika knappar
    Given att användaren är på webb sidan
    When spelarna har angivit sina namn för att spela
    And spelet startas
    And det går att se vem ska börja köra
    And man börjar med att spela
    Then ska användaren kunna trycka på avsluta knappen under spelets gång
    And användaren ska få upp tre alternativa knappar att välja 