Feature: Turas om i spelet via nätverk

  Scenario: Användare turas om för att lägga en pjäs
    Given att vi är två spelare och en skapar ett spel och en går med i spelet
    Then två spelare ska se att det är första spelarens tur
    When Spelare 1 lägger sin pjäs i kolumn 0
    Then ska "O: Tim's tur..." visas i två fönstren
    When Spelare 2 lägger sin pjäs i kolumn 1
    Then ska "X: Amy's tur..." visas i båda fönstren
    
