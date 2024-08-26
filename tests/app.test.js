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
  setMockAnswers(undefined, 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(consoleOutput[0]).toBeDefined('Du måste skriva i något namn!');
})



//test play again
test("Programmet ska fråga spelarna om de vill spela igen (ja/nej)", () => {
  setMockAnswers('ja', 'nej', 'end-test');
    if ('nej') {
      return 'end-test'; }
    if ('ja') { return new App; } 
})



//test that the players write a string and not a number
test("Kolla att spelarna har inte skrivit nummer eller symboler", () => {
  setMockAnswers(/[^a-zA-Z\s]/, 'end-test');
  expect(() => new App()).toThrow('end-test');
  expect(consoleOutput[0]).toBeDefined('Namnet får inte innehålla siffror eller specialtecken!');
})



//test winner
test("Se vem som har vunnit", () => {
  setMockAnswers('end-test');
  expect(() => new App()).toThrow('end-test');
  expect(consoleOutput[0]).toBeDefined('Grattis ${winningPlayer.color}: ${winningPlayer.name} du har vunnit!');
})