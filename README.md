# Specifikationer Fyra_i_Rad sprint 2
Vi har använt oss av Javascript i Visual studio code för att skriva vårt program. Vi har gjort våra tester med hjälp av Cypress och Cucumber. Vi har använt HTML och CSS för att göra vårt gränsnitt och testa gränsnittet (run test -ui).

## Board / detaljerade specifikationer
Som användare vill jag att klass Board ska kunna ha funktioner som att lägga pjäser på ett spelbräde som är 7x6, vems tur det är att spela, se vem som har vunnit eller om det blivit oavgjort genom att få upp en text. Även så ska brädspelet nollställas efter varje spel omgång.
Man kan spela upp till två spelare, Spelare 1 och Spelare 2. Spelarna får fylla i sina namn i början på spelet.
Spelarna ska turas om att spela. Om spelet är slut så ska spelarna inte kunna fortsätta att lägga pjäserna.
Det är ovanligt för spelarna att få oavgjort, men om det händer så ska det dyka upp ett meddelande som informerar spelarna.


### Testade
2.1. Som användare ska man kunna skriva in sina namn i spelet.
2.2.Som användare ska man kunna se vem som har vunnit spelet.
2.3.Som användare ska man kunna turas om i spelet för att lägga en pjäs.
3.Som användare så ska alla drag registreras korrekt på spelbrädet (dvs välja en kolumn att lägga min pjäs).
4.Som användare ska man se vem som har vunnit genom att få ett meddelande.
5.Som användare ska man kunna se om det blivit oavgjort.
6.1.Som användare vill jag efter avslutat spel kunna trycka på knappen "Spela igen".
6.2.Som användare så ska man kunna trycka på knappen "Fortsätta" när man har tryckt på "Avsluta" knappen.
6.3.Som användare så ska man kunna trycka på knappen "Nya spelare".
6.4.Som användare ska man kunna trycka på avsluta knappen och få upp tre alternativ (knappar), Fortsätta, spela igen, Nya spelare
10.1.Som användare ska man inte kunna lägga mer pjäser när spelet är slut.


#### Problem
Under arbetet så har vi stött på problem. Cypress krånglade när vi skulle få den att funka ihop med vårt program, sen när vi skulle använda en äldre version av Cypress så blev det lite konflikter i package.json. Trots dessa motgångar så har vi lyckats lösa dessa problem och fått till ett fungerande program med tester.
 

##### Inte testade

