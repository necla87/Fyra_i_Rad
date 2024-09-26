Feature: External AI bot
   As a user I want to be able to test how smart our difficult AI is by testing it against an external AI.

  Scenario: Human vs Smart Bot
    Given that we start the game between human and smart bot
    When the external AI plays as human
    Then we expect our bot win