Feature: Två AI spelar mot varandra

  Scenario: Två AI spelar mot varandra
    Given användaren skriver sitt namn som "AI1" och väljer svår bot.
    When användaren skriver sitt namn som "AI2" och väljer svår bot.
    Then AI1 ska göra det första draget.
    And AI2 ska göra ett drag efter AI1.
    Then spelet ska fortsätta tills någon vinner eller det blir oavgjort.
