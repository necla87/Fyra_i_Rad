# Specifikationer Fyra_i_Rad sprint 4

Vi har använt oss av Javascript i Visual studio code för att skriva vårt program. Vi har gjort våra tester med hjälp av Cypress och Cucumber. För att få igång testerna så har vi skrivit in run test -ui i terminalen. Vi har impementerat iframes i programmet så att vi kan testa att vår online funktion fungerar.

## Board / detaljerade specifikationer
Som användare vill jag att klass Board ska kunna ha funktioner som att lägga pjäser på ett spelbräde som är 7x6, vems tur det är att spela, se vem som har vunnit eller om det blivit oavgjort genom att få upp en text. Även så ska brädspelet nollställas efter varje spel omgång.

Man kan spela upp till två spelare, Spelare 1 och Spelare 2. Som användare kan man välj att spela antingen online eller offline.

Online funktion:

När första dialogen dyker upp så har användaren valet att spela online eller offline. Om användaren vill spela online så trycker hen på Ja knappen när den första dialogen dyker upp. Sen får användaren olika alternativ, antingen att gå med i ett spel eller att skapa ett spel. När användaren har valt att gå med eller skapa ett spel så behöver hen skriva in sitt namn. Om en spelare väljer att skapa ett spel så får hen en kod som man behöver dela/skicka till den spelaren som vill gå med i spelet. När spelet har startat igång så kan man se vems tur det är att börja. Spelarna ska turas om att spela.  När man har spelat klart så kan man på skärmen se vem som har vunnit spelet. Man kan se den vinnande kombinationen genom att pjäserna pulserar och markeras med en annan färg. Det är ovanligt för spelarna att få oavgjort, men om det händer så ska det dyka upp ett meddelande som informerar spelarna.

Offline funktion:

Om användaren väljer nej knappen så kan man spela offline. Spelarna behöver fylla i sina namn och välja de tre alternativ som dyker upp: att spela som människa, som en enkel bot eller svår bot. När spelet har startat igång så kan man se vems tur det är att börja. Spelarna ska turas om att spela. När man har spelat klart så kan man på skärmen se vem som har vunnit spelet. Man kan se den vinnande kombinationen genom att pjäserna pulserar och markeras med en annan färg. 
Om spelet är slut så ska spelarna inte kunna fortsätta att lägga pjäserna. Det är ovanligt för spelarna att få oavgjort, men om det händer så ska det dyka upp ett meddelande som informerar spelarna.


### Testade
1.1 Som användare vill jag kunna spela mot en annan användare via nätverk/internet.
1.2 Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i. (två fönster).
1.3 Som användare vill jag kunna turas om i spelet för att lägga en pjäs så att spelet fortsätter korrekt (ska visas som text i två fönster).
1.4 Som användare vill jag kunna se vem sor har vunnit. (två fönster)
1.5 Som användare vill jag kunna välja bland olika alternativ och knappar (för att spela online).
1.6 Som användare vill jag kunna se om det blir oavgjort (två fönster).
1.7 Som användare vill jag kunna få fel meddelande ifall jag skriver in fel kod.
1.8 Som användare vill jag kunna starta ett spel online.
2.1 Som systemägare vill jag att automatiserade tester ska köras för att säkerställa att nätverksspelet fungerar korrekt. (med cypress)

#### Problem
Vi använde oss av iframe för att testa våra online funktioner, men det skapade tekniska problem i Cypress. För att lösa vårt problem så behövde vi lägga till cy.wait i flera delar av koden för att Cypress skulle hinna hämta all information.

