Feature: automatiserade tester

  Som systemägare vill jag att automatiserade tester ska köras för att säkerställa
  att nätverksspelet fungerar korrekt.

  Scenario: Kör automatiserade tester för nätverksspel
    Given att vi är två spelare, där en spelare bjuder in ett spel och den andra vill gå med
    When spelet är igång tills en av spelarna vinner
    Then då kan spelare välja att spela igen eller avsluta