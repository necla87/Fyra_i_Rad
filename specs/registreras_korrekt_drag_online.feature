Feature: Registrera korrekt drag på spelbrädet online

  Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i. Det ska kunna visas i två fönster samtidigt på samma skärm för att se om online funktionen funkar.

  Scenario: Registrera korrekt drag online
  Given att användaren har två fönster öppna samtidigt som visar hemsidan
  And att användaren ska kunna se en text där det står "Online spel: Vill du spela mot en vän via internet?"
  When användaren väljer att spela online genom att trycka på "Ja" knappen på båda fönstrerna
  And användaren väljer att trycka på "Skapa" knappen i fönsta fönstret
  And användaren som vill skapa ett spel skriver in sitt spel namn och trycker på enter
  And en text dyker upp med en generad kod som din vän ska skriva in
  And trycker på "OK" knappen
  And användaren väljer att trycka på "Gå med" knappen i andra fönstret
  And användaren som vill joina skriver in sitt spel namn och trycker på enter
  And skriver in vän koden
  Then ska man kunna starta spelet
  And användaren ska kunna se vems tur det är att spela först
  And användaren gör ett drag
  And det ska registreras och visas på båda fönsterna
