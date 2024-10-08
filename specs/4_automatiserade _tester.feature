Feature: automatiserade tester

  Som systemägare vill jag att automatiserade tester ska köras för att säkerställa
  att nätverksspelet fungerar korrekt.

  Scenario: Kör automatiserade tester för nätverksspel
    Given att nätverksspelet är implementerat
    When automatiserade tester körs
    Then ska nätverksspelet fungerar korrekt