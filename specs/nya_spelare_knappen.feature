Feature: Nya spelare knappen

    Som användare vill jag kunna trycka på nya spelare knappen efter att spelet är slut.


    Scenario: Nya spelare knapp
    Given att användare är på start sidan 
    When spelarna har angett sina namn
    And spelet körs igång
    And det går att se vems tur det är att börja
    And spelets körs igång
    And någon av spelarna får fyra i rad
    Then ska användaren få möjlighet att kunna välja nya spelare genom att trycka på knappen