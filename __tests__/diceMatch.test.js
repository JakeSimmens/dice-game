//jest version 26.2
const diceClasses = require('../diceMatch');

const DiceMatchData = diceClasses.DiceMatchData;

describe("DiceMatchData", () => {

    let data = new DiceMatchData;
    it("should create a class", () => {
        expect(data).toBeInstanceOf(DiceMatchData);
    })


    it("should clear the tallied losses arrays", () => {
        data.tallyOfLosses = { attacker: [-1, 0, 0], defender: [0, -1, -1] };
        data.clearLossesTally();
        expect(data.tallyOfLosses).toMatchObject({ attacker: [], defender: [] });
    })
});

// describe("DiceMatchAttackerVsDefender", () => {

//     const DiceMatchAttackerVsDefender = new diceClasses.DiceMatchAttackerVsDefender;
//     console.log(DiceMatchAttackerVsDefender);

//     describe("checkAllPlayersPressRoll", () => {

//     });

// });



const Dice = diceClasses.Dice;
let newDiceRoll;

describe("rollDice", () => {
    beforeEach(() => {
        newDiceRoll = new Dice;
    });
    it("should return 3 integers when 3 dice are rolled", () => {
        expect(newDiceRoll.rollDice(3)).toHaveLength(3);
    });
    it("should return 1 integer when no arguments are passed", () => {
        expect(newDiceRoll.rollDice()).toHaveLength(1);
    });
    it("should return 20 integers when 20 dice are rolled", () => {
        expect(newDiceRoll.rollDice(20)).toHaveLength(20);
    });
    it("should return an empty array when 0 dice are rolled", () => {
        expect(newDiceRoll.rollDice(0)).toHaveLength(0);
    });
    it("should return an empty array when side count of die is -1", () => {
        expect(newDiceRoll.rollDice(1, -1)).toHaveLength(0);
    });

    it("should return an array of 20 integers between 1 and 6", () => {
        const NUM_OF_DIE = 20;
        const SIDES_OF_DIE = 6;
        const DIE_POSSIBILITIES = [1, 2, 3, 4, 5, 6];

        const diceResults = newDiceRoll.rollDice(NUM_OF_DIE, SIDES_OF_DIE);
        expect(DIE_POSSIBILITIES).toEqual(expect.arrayContaining(diceResults));
    });

    it("should return an array of 15 integers between 1 and 120", () => {

        const NUM_OF_DIE = 15;
        const SIDES_OF_DIE = 120;
        const DIE_POSSIBILITIES = [];

        for (let dieFaceValue = 1; dieFaceValue <= SIDES_OF_DIE; dieFaceValue++) {
            DIE_POSSIBILITIES.push(dieFaceValue);
        }

        const diceResults = newDiceRoll.rollDice(NUM_OF_DIE, SIDES_OF_DIE);
        expect(DIE_POSSIBILITIES).toEqual(expect.arrayContaining(diceResults));
    });
});



describe("sortLargeToSmall", () => {
    let diceFunctions = new Dice;
    let unsortedArray = [3, 1, 6, 8, 3, 2, 9, 7];
    let expected = [9, 8, 7, 6, 3, 3, 2, 1];

    it("should return array containing the same numbers", () => {
        expect(diceFunctions.sortLargeToSmall(unsortedArray)).toEqual(expect.arrayContaining(expected));
    });
    // it("should return array listing numbers largest first", () => {
    //     expect(diceFunctions.sortLargeToSmall(unsortedArray)).toBe(expected);
    // });
});


describe("sortSmallToLarge", () => {
    let diceFunctions = new Dice;
    let unsortedArray = [3, 1, 6, 8, 3, 2, 9, 7];
    let expected = [1, 2, 3, 3, 6, 7, 8, 9];

    it("should return array containing the same numbers", () => {
        expect(diceFunctions.sortSmallToLarge(unsortedArray)).toEqual(expect.arrayContaining(expected));
    });
    // it("should return array listing numbers largest first", () => {
    //     expect(diceFunctions.sortLargeToSmall(unsortedArray)).toBe(expected);
    // });
});



