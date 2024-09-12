Feature: Turas om för att lägga en pjäs
  Som användare
  Vill jag kunna turas om i spelet för att lägga en pjäs
  Så att spelet fortsätter korrekt

  Scenario: Turväxling mellan spelarna
    Given att spelet har börjat och användaren har angett sitt namn "ANNA" och "OLLE"
    And spelet är i gång.
    When ANNA placerar sin pjäs på spelplanen
    Then ska spelet visa "Olles tur".
    When OLLE placerar sin pjäs på spelplanen
    Then ska spelet ser "Annas tur"
