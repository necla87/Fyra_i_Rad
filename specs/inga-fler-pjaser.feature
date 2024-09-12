Feature: Ingen fler pjäser när spelet är över

  Scenario: Användare försöker lägga en ny pjäs efter att spelet är över
    Given Användaren har laddat spelsidan
    And Användaren har spelat ett spel och spelet är över
    When Användaren försöker lägga en ny pjäs
    Then Ska inga fler pjäser kunna läggas på spelbrädet
