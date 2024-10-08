import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('att nätverksspelet är implementerat', () => {
  cy.visit('/iframed-network-play.html');
  // TODO: implement step
});

When('automatiserade tester körs', () => {
  // TODO: implement step
});

Then('ska nätverksspelet fungerar korrekt', () => {
  // TODO: implement step
});