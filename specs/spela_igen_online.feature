Feature: Spela om spelet online

  Som användare vill jag kunna spela igen om båda spelarna vill det.Feature name

  Scenario: Spela om efter att spelet är slut.
    Given att spelet är slut
    And båda spelarna vill spela igen
    When spelet startas om
    Then ska ett nytt spel börja
