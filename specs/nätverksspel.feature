Feature: Spela mot en annan användare via nätverk/internet

  Scenario: Spelare kan spela fyra i rad och få en vinnare
    Given att vi är två spelare, där en skapar ett spel och den andra ansluter sig
    When Spelare 1 lägger sin pjäs i en kolumn
    And Spelare 2 lägger sin pjäs i en annan kolumn
    And spelet fortsätter tills en av spelarna får fyra i rad
    And spelet ska meddela att vinnaren är den spelare som fick fyra i rad