Feature: Se om det blir oavgjort

  Scenario: Användare ser att spelet slutar oavgjort
    Given att vi är två spelare, där en av oss skapar ett spel medan den andra går med.
    When spelet fortsätter tills brädet är fullt utan vinnare
    Then ska "Oavgjort..." visas i fönstren för båda spelarna.
