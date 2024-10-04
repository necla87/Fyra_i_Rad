Feature: Nätverksspel för Fyra i Rad-spelet
  Som en användare vill jag kunna spela Fyra i Rad mot en annan användare över nätverket
  så att vi kan njuta av spelet tillsammans på distans.

  Scenario: Starta ett nytt nätverksspel och spela mot en vän
     Given att användare är på huvudsidan för Fyra i Rad
     When  användaren väljer att spela online
     And   användaren väljer att "Skapa ett nytt spel"
     And   användare skriver in sitt namn som "Spelare 1"
     Then  ska användare få en gå med-kod att skicka till sin vän
     When  Spelare 2 går med hjälp av gå med-koden
     Then  ska båda spelarna vara anslutna
     And   användaren ska se spelbrädet
     When  Spelare 1 gör det första draget
     Then  ska Spelare 2 kunna se det uppdaterade spelbrädet
     When  Spelare 2 gör sitt drag
     Then  ska Spelare 1 kunna se det uppdaterade spelbrädet
     And   spelet fortsätter tills en spelare vinner eller brädet är fullt
