Feature: Göra ett drag på spelbrädet

  Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i.

  Scenario: Spelare gör ett drag och det registreras korrekt på spelbrädet
    Given Användaren navigerar till spelsidan
    And Användaren skriver in ett namn för spelare1 och klickar på enter
    And Användaren skriver in ett namn för spelare2 och klickar på enter
    When Spelare1 klickar på kolumn 3 för att placera sin bricka
    Then Bör brickan placeras i den lägsta tillgängliga raden i kolumn 3