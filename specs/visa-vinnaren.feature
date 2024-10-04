Feature: Fyra i Rad - Visa vinnaren
  Som en användare vill jag kunna se vem som har vunnit Fyra i Rad-spelet
  så att vi vet när spelet är över och vem som är vinnaren.

  Scenario: En spelare vinner spelet och båda spelarna kan se vinnaren
    Given att användare är på huvudsidan för Fyra i Rad
    When  användaren väljer att spela online
    And   användaren väljer att "Skapa ett nytt spel"
    And   användaren skriver in sitt namn som "Spelare 1"
    Then  ska användaren få en gå med-kod att skicka till sin vän
    When  Spelare 2 går med hjälp av gå med-koden
    Then  ska båda spelarna vara anslutna
    And   användaren ska se spelbrädet
    When  Spelare 1 och Spelare 2 spelar tills en spelare vinner
    Then  ska vinnaren visas på Spelare 1:s skärm
    And   vinnaren ska visas på Spelare 2:s skärm
