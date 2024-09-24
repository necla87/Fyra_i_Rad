Feature: External AI bot

  Scenario: Human vs Smart Bot
    Given that we start the game between human and smart bot
    When the external AI plays as human
    Then we expect our bot win