Feature: Starta ett online-spel i Fyra i Rad
  Som en användare vill jag kunna starta ett Fyra i Rad-spel online
  så att jag kan bjuda in en vän och spela över internet.

  Scenario: Starta ett nytt online-spel
    Given att användaren är på huvudsidan för Fyra i Rad
    When  användaren väljer att spela online
    And   användaren väljer att "Skapa ett nytt spel"
    And   användaren skriver in sitt namn som "Spelare 1"
    Then  ska användaren få en gå med-kod att skicka till sin vän
    And   användaren ska se att spelet väntar på att en vän ska gå med
