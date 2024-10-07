Feature: Olika alternativ av knappar online

  Som användare vill jag kunna välja bland olika alternativ och knappar för online funktionen.


  Scenario: Olika knappar online
  Given att användaren är på första sidan av spelet Fyra i rad
  And det dyker upp en text som frågar om användaren vill spela online
  And det finns en Ja- och Nej knapp
  When användaren trycker på "Ja" knappen 
  Then så finns det möjlighet att Skapa ett spel eller gå med i ett existerande spel 