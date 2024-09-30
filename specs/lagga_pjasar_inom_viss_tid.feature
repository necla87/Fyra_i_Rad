Feature: AI bot ska lämna pjäser inom viss tid

   Som användare vill jag att AI bot ska lägga sina pjäser inom en viss tid.

   Scenario: Tidslimit för att lägga pjäser
      Given att användaren befinner sig på spelsidan
      When spelaren skriver in ett namn för första spelaren och trycker på enter
      And väljer knappen Människa
      And spelaren skriver in ett namn för andra spelaren och trycker på enter
      And väljer knappen svår bot
      And spelarna börjar spela mot varandra
      Then spelarna ska lägga sina pjäser inom 3 sekunder


