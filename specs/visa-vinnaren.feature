Feature: Fyra i Rad - Visa vinnaren
  Som en användare vill jag kunna se vem som har vunnit Fyra i Rad-spelet
  så att vi vet när spelet är över och vem som är vinnaren.

  Scenario: En spelare vinner spelet och båda spelarna kan se vinnaren
    Given att vi är två spelare, där en av oss skapar ett spel medan den andra går med
    When spelet fortsätter tills Anna vann
    Then ska "Anna vann!" visas i fönstren för båda spelarna
