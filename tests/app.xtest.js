import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPrompt.js';
import App from '../classes/app.js';



test("The program should ask for the players name", () => {
  setMockAnswers('William', 'Erika', 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
})



test("Check that the players have written a name", () => {
  setMockAnswers('', 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(consoleOutput[1][0]).toBe('Du måste skriva i något namn!');
})



test("The program should ask if the players want to play again (ja/nej)", () => {
  setMockAnswers('William', 'Erika', '4', '3', '4', '3', '4', '3', '4', 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(promptQuestions[9]).toBe('Vill ni spela igen? (ja/nej)? ');
})


  
test("The program should start a new game when the players write ja", () => {
  setMockAnswers('William', 'Erika', '4', '3', '4', '3', '4', '3', '4', 'ja', 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(promptQuestions[10]).toBe('Spelare X:s namn: ');
})
 


test("Check that the players do not use numbers or/and symbols", () => {
  setMockAnswers(/[^a-zA-Z\s]/, 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(consoleOutput[1][0]).toBe('Namnet får inte innehålla siffror eller specialtecken!');
})




