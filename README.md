# Specifikationer Fyra_i_Rad sprint 3
Vi har använt oss av Javascript i Visual studio code för att skriva vårt program. Vi har gjort våra tester med hjälp av Cypress och Cucumber. För att få igång testerna så har vi skrivit in run test -ui i terminalen. Vi har skapat två AI botar med olika svårighetsgrader, enkel och svår.

## Board / detaljerade specifikationer
Som användare vill jag att klass Board ska kunna ha funktioner som att lägga pjäser på ett spelbräde som är 7x6, vems tur det är att spela, se vem som har vunnit eller om det blivit oavgjort genom att få upp en text. Även så ska brädspelet nollställas efter varje spel omgång.
Man kan spela upp till två spelare, Spelare 1 och Spelare 2. Efter att en spelare har fyllt i sitt namn så får hen tre alternativ att välja mellan: att spela som människa, som en enkel bot eller svår bot. 
Spelarna ska turas om att spela. Om spelet är slut så ska spelarna inte kunna fortsätta att lägga pjäserna.
Det är ovanligt för spelarna att få oavgjort, men om det händer så ska det dyka upp ett meddelande som informerar spelarna.


### Testade
1.Som användare ska jag kunna se att 2 smart AI spelar mot varandra och kunna se resultat.
2.Som produktägare vill jag kunna testa AI-modellen för att säkerställa att den förstår och kan lägga pjäser på spelbrädet.
3.Som användare ska jag kunna välja om jag vill spela mot en enkel eller en svår bot genom olika knapp alternativ.
4.Som användare vill jag att AI bot ska lägga sina pjäser inom en viss tid.
5.Som systemägare vill jag kunna testa hur smart vår svåra AI är genom att testa den mot en extern AI.


#### Problem
Det har varit svårt att implementera logiken i vårt program, även så har det varit utmanande att få till AI-botarna. Även så har det uppstått konflikter när vi arbetat med att testa vår smarta AI mot en extern-AI. Vi har haft tekniska problem med Cypress under arbetets gång, som tur gick det att lösa genom att ladda om sidan.  
 



