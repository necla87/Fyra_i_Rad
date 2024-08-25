import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPrompt.js';
import App from '../classes/app.js';



//test players name
test("App ska fråga efter spelarnas namn", () => {
  setMockAnswers('William', 'Erika', 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
})

//test that the name is not undefined
test("Kolla att spelarna har skrivit in något namn", () => {
  // Sätter mockade svar som spelarnamn
  const playerNames = ['William', 'Erika', undefined, 'end-test'];

  // Loopar igenom alla spelarnamn för att kolla om något är undefined
  for (let i = 0; i < playerNames.length; i++) {
    if (playerNames[i] === undefined) {
      console.error(`Error: Spelaren på index ${i} har inget namn.`);
      return;  // Avbryter testet om ett namn är undefined
    }
  }

  // Om alla namn är definierade, fortsätt med spelet
  setMockAnswers(...playerNames);

  if (value === undefined) {
    return new App();
  }
  if (value === 'William', 'Erika') {
    return startGameLoop();
  }
});



//test play again
test("Programmet ska fråga spelarna om de vill spela igen (ja/nej)", () => {
  setMockAnswers('ja', 'nej', 'end-test');
    if ('nej') {
      return 'end-test'; }
    if ('ja') { return new App; } 
})


//test that the players write a string and not a number
test("Kolla att spelarna har skrivit in något namn", () => {
  // Sätter mockade svar som spelarnamn
  const playerString = ['William', 'Erika', Number, 'end-test'];

  // Loopar igenom alla spelarnamn för att kolla om något är undefined
  for (let i = 0; i < playerString.length; i++) {
    if (playerString[i] === Number) {
      console.error(`Error: Spelaren ${i} skrev med nummer, skriv med bokstäver istället!.`);
      return;  // Avbryter testet om ett namn är undefined
    }
  }

  // Om alla namn är definierade, fortsätt med spelet
  setMockAnswers(...playerString);

  if (value === Number) {
    return new App();
  }
  if (value === 'William', 'Erika') {
    return startGameLoop();
  }
});


//test winner - FORTSÄTT!
/*test("Se vem som har vunnit", () => {
  const playerWinCheck = ['X', 'O']

})*/