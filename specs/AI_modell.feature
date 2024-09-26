Feature: Testa AI-modellens förmåga att spela på spelbrädet

  Som produktägare
  Vill jag verifiera att AI-modellen korrekt kan förstå spelets tillstånd
  och göra giltiga drag på spelbrädet

  Scenario: AI gör ett drag på spelbrädet
    Given Användaren skriver sitt namn som "Eva" och väljer Människa.
    When  Användaren skriver sitt namn som "AI" och väljer svår bot.
    Then  Eva ska göra det första draget.
    Then  AI ska göra ett drag efter Eva.
    Then  AI:s drag ska placeras på en giltig position på spelbrädet.