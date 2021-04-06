const dice = require('./diceMatch');
const { TestResult } = require("@jest/types");
const { enhanceUnexpectedTokenMessage } = require("@jest/transform/build/enhanceUnexpectedTokenMessage");

let Dice = dice.Dice;
let newDiceRoll = new Dice;


test("request 1 random integer between 1 and 6", () => {
    expect(newDiceRoll.rollDice(3, 6)).toHaveLength(3);
})
