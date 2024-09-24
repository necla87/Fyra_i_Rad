Feature: AI botar lämnar pjäser inom viss tid

   Som användare vill jag att AI botar ska lägga sina pjäser inom en viss tid.

   Scenario: Tidslimit för att lägga pjäser
   Given att användaren befinner sig på spelsidan
   When spelaren skriver in ett namn för första spelaren och trycker på enter 
   And väljer enkel bot
   And spelaren skriver in ett namn för andra spelaren och trycker på enter
   And väljer svår bot
   And spelarna som är AI botar börjar spela mot varandra 
   Then AI spelarna ska lägga sina pjäser inom en viss tid


   