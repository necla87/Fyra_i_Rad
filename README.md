# Specifikationer Fyra_i_Rad sprint 4


## Board / detaljerade specifikationer
Som användare vill jag att klass Board ska kunna ha funktioner som att lägga pjäser på ett spelbräde som är 7x6, vems tur det är att spela, se vem som har vunnit eller om det blivit oavgjort genom att få upp en text. Även så ska brädspelet nollställas efter varje spel omgång.
Man kan spela upp till två spelare, Spelare 1 och Spelare 2. Efter att en spelare har fyllt i sitt namn så får hen tre alternativ att välja mellan: att spela som människa, som en enkel bot eller svår bot. 
Spelarna ska turas om att spela. Om spelet är slut så ska spelarna inte kunna fortsätta att lägga pjäserna.
Det är ovanligt för spelarna att få oavgjort, men om det händer så ska det dyka upp ett meddelande som informerar spelarna.


### Testade
1.3 Som användare vill jag kunna turas om i spelet för att lägga en pjäs så att spelet fortsätter korrekt (ska visas som text i två fönster).
1.6 Som användare vill jag kunna se om det blir oavgjort.(två fönster)
1.7 Som användare vill jag kunna få fel meddelande ifall jag skriver in fel kod


#### Problem

 

##### Inte testade
1.1 Som användare vill jag kunna spela mot en annan användare via nätverk/internet.
1.2 Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i. (två fönster)
1.4 Som användare vill jag kunna se vem sor har vunnit. (två fönster)
1.5 Som användare vill jag kunna välja bland olika alternativ och knappar (två fönster).
1.8 Som användare vill jag kunna starta ett spel online.
2.1 Som systemägare vill jag att automatiserade tester ska köras för att säkerställa att nätverksspelet fungerar korrekt. (med cypress)
