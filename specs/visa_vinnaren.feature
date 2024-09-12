Feature: Ange namn vid spelets början
  Som användare
  Vill jag kunna att datorn kan använda sig av det för att meddela vems tur det är och vem som har vunnit.

  Scenario: Meddela vinnaren med namn

    Given att spelet har startat och användaren har angett sitt namn "ANNA" och "OLLE"
    And spelet är i gång
    When Anna placerar sin bricka på en vinnande position
    And spelet avslutas med en vinnande kombination
    Then ska spelet visa "Anna vann!"

