Feature: Turas om i spelet via nätverk

  Scenario: Användare turas om för att lägga en pjäs
    Given Spelare X har öppnat webbplatsen
    When Spelare X svarar "Ja" på frågan "Vill du spela mot en vän via internet?"
    And Spelare X svarar "Skapa" på frågan "Vill du skapa ett nytt online spel? Eller gå med i en existerande?"
    And Spelare X skriver in sitt namn "Spelare X" och trycker enter
    Then ska en kod visas på skärmen
    Given Spelare O har öppnat webbplatsen
    When Spelare O svarar "Ja" på frågan "Vill du spela mot en vän via internet?"
    And Spelare O svarar "Gå med" på frågan "Vill du skapa ett nytt online spel? Eller gå med i en existerande?"
    And Spelare O skriver in sitt namn "Spelare O" och trycker enter
    And Spelare O skriver in koden "ABCD1234" och trycker enter
    And spelet har startat med Spelare X som börjar
    When Spelare X lägger sin pjäs i kolumn 3
    And ska "Spelare O's tur..." visas i både fönstren
    When Spelare O lägger sin pjäs i kolumn 4
    And ska "Spelare X's tur..." visas i både fönstren
    When Spelare X lägger sin pjäs i kolumn 5
    And ska "Spelare O's tur..." visas i både fönstren
    And Spelare O lägger sin pjäs i kolumn 6
    Then ska "Spelare X's tur..." visas i både fönstren