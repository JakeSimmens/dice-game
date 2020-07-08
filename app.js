
//Requires class Players as arguments for constructor
class DiceMatch {

    constructor(
        { attacker, attackerLives } = {},
        { defender, defenderLives } = {},
        dieSideCount) {

        this.attacker = {
            player: attacker,
            lives: attackerLives,
            rollHistory: []
        };

        this.defender = {
            player: defender,
            lives: defenderLives,
            rollHistory: []
        };

        this.dieSideCount = dieSideCount;

    }

    // get numPlayers() {
    //     return this.players.length;
    // }

    // get whosTurn() {
    //     //return this.players[this.turnCount % this.numPlayers - 1];
    //     return this.players[0];
    // }

    // nextPlayer() {
    //     let turnOver = this.players.shift();
    //     this.players.push(turnOver);
    //     return this.players[0];
    // }

    attack(attackerNumOfDice = 1, defenderNumOfDice = 1) {
        if (attackerNumOfDice <= 0 || defenderNumOfDice <= 0) return;

        const attacker = this.attacker;
        const defender = this.defender;

        const attackerRoll = this.largeToSmall(this.roll(attackerNumOfDice));
        const defenderRoll = this.largeToSmall(this.roll(defenderNumOfDice));

        let diceToCompare = 0;
        let losses = {
            attacker: [],
            defender: []
        };

        if (attackerRoll.length >= defenderRoll.length) {
            diceToCompare = defenderRoll.length;
        } else {
            diceToCompare = attackerRoll.length;
        }

        for (let i = 0; i < diceToCompare; i++) {
            if (attackerRoll[i] > defenderRoll[i]) {
                losses.attacker.push(0);
                losses.defender.push(-1);
                defender.lives--;
            } else {
                losses.attacker.push(-1);
                losses.defender.push(0);
                attacker.lives--;
            }
        }

        attacker.rollHistory.push([...attackerRoll]);
        defender.rollHistory.push([...defenderRoll]);

        //need to push a unique copy and not the pointer to the object
        //this.battleHistory.push(this.activeBattle);


        return {
            attackerLosses: losses.attacker,
            defenderLosses: losses.defender,
            attackerRoll: attackerRoll,
            defenderRoll: defenderRoll
        }

    }

    //Returns an array of the requested number of dice rolled defaulted to 6 sides.
    roll(numDice, numSides = 6) {

        const diceArray = [];
        let result;

        if (numDice < 1 || numSides < 2) {
            console.log("rollDice requires at least 1 die and 2 sides");
            return [];
        }

        for (let i = 0; i < numDice; i++) {
            result = Math.floor(Math.random() * numSides + 1);
            diceArray.push(result);
        }

        return diceArray;


    }

    largeToSmall(array) {
        array.sort((a, b) => {
            return b - a;
        });

        return array;
    }

    smallToLarge(array) {
        array.sort((a, b) => {
            return a - b;
        });

        return array;
    }
}



//test data
const DIE_SIDES = 6;
const jake = new Player("Jake");
const elise = new Player("Elise");
//const isaac = new Player("Isaac");
//const elijah = new Player("Elijah");
//const risk = new DiceMatch({ attacker: jake, attackerLives: 10 }, { defender: elise, defenderLives: 7 }, DIE_SIDES);
const risk = new DiceMatch({ attacker: jake, attackerLives: 10 }, { defender: elise, defenderLives: 7 }, DIE_SIDES);

risk.attack(3, 3);
risk.attack(3, 3);
risk.attack(3, 1);
risk.attack(2, 2);


