Feature: Två AI spelar mot varandra

  Scenario: Två AI spelar mot varandra
    Given användaren skriver sitt namn som "AI1" och väljer svår bot.
    When användaren skriver sitt namn som "AI2" och väljer svår bot
    And jag ska kunna se att spelet spelas mellan AI1 och AI2
    And jag ska se att den första AI:n har gjort ett drag
    And jag ska se att den andra AI:n också gör ett drag
    Then jag ska se att vem har vunnit

