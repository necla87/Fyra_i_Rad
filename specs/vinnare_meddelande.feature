Feature: Få ett meddelande om vem som vunnit spelet

   Som användare ska man kunna se vem som har vunnit spelet.



   Scenario: Få ett meddelande om vem som vunnit
   Given att användaren är inne på hemsidan
   When spelarna har skrivit in sina namn
   And spelet startar
   And det går att se vem som ska börja spelet
   And man börjar spela
   And någon av spelarna får fyra i rad och vinner spelet
   Then då dyker det upp en text där det står vem som har vunnit spelet
