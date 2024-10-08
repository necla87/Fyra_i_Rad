Feature: Felmeddelande online

  Som användare vill jag kunna få fel meddelande ifall jag skriver in fel kod.

  Scenario: Få upp ett felmeddelande
    Given att användaren vill spela online på två skärmar
    When användaren som vill gå med skriver in en felaktig kod
    Then ska ett felmeddalande dyka upp