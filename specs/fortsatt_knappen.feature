Feature: Kunna trycka på fortsätta knappen 

    Som användare vill jag kunna trycka på fortsätta knappen när man har tryckt på avsluta knappen. 


    Scenario: Fortsätta knappen
    Given att användare är på första sidan 
    When spelarna har skrivit sina namn
    And spelet går igång
    And det går att se vem tur det är att börja 
    And man börjar spela spelet
    And spelaren trycker på avsluta under spelets gång
    Then ska spelaren få alternativet att trycka på knappen fortsätta