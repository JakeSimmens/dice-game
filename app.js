const attackerResults = document.querySelector("#attackerResults");
const defenderResults = document.querySelector("#defenderResults");
const compareResults = document.querySelector("#compareResults");
const btnAttackerRoll = document.querySelector("#attackerRoll");
const btnDefenderRoll = document.querySelector("#defenderRoll");
const attackerNumDice = document.querySelector("#attackerNumDice");
const defenderNumDice = document.querySelector("#defenderNumDice");
const attackLives = document.querySelector("#attackerLives");
const defendLives = document.querySelector("#defenderLives");





//Requires class Players as arguments for constructor
//input
//Attacker object:  Player class, number of lives
//Defender object:  Player class, number of lives
//# of sides on die
//Button for attacker roll
//Button for defender roll
//Input for attacker number of dice to roll
//Input for defender number of dice to roll
class DiceMatch {

    constructor(
        { attacker, attackerLives } = {},
        { defender, defenderLives } = {},
        dieSideCount,
        btnARoll, btnDRoll, attNumDice, defNumDice, attackLivesDisplay, defendLivesDisplay) {

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
        this.attNumDice = attNumDice;
        this.defNumDice = defNumDice;
        this.attackLivesDisplay = attackLivesDisplay;
        this.defendLivesDisplay = defendLivesDisplay;
        this.rollStatus = [false, false];


        this.attackLivesDisplay.innerHTML = `LIVES: ${this.attacker.lives}`;
        this.defendLivesDisplay.innerHTML = `LIVES: ${this.defender.lives}`;
        btnARoll.addEventListener("click", () => this.readyToRoll("attacker"));
        btnDRoll.addEventListener("click", () => this.readyToRoll("defender"));

    }

    readyToRoll(player) {
        if (player === "attacker") {
            this.rollStatus[0] = true;
        }
        if (player === "defender") {
            this.rollStatus[1] = true;
        }
        if (this.rollStatus[0] && this.rollStatus[1]) {
            this.attack(this.attNumDice.value, this.defNumDice.value);
            this.rollStatus[0] = false;
            this.rollStatus[1] = false;
            this.attackLivesDisplay.innerHTML = `LIVES: ${this.attacker.lives}`;
            this.defendLivesDisplay.innerHTML = `LIVES: ${this.defender.lives}`;
        }
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

        attacker.rollHistory.push([...attackerRoll]);
        defender.rollHistory.push([...defenderRoll]);
        let losses = this.compareDice(attackerRoll, defenderRoll);

        this.displayBattleResults(attackerRoll, defenderRoll, losses,
            attackerResults, defenderResults, compareResults);

        return {
            attackerLosses: losses.attacker,
            defenderLosses: losses.defender,
            attackerRoll: attackerRoll,
            defenderRoll: defenderRoll
        }

    }

    //Pass in array of dice to compare
    //return: object of losses
    compareDice(attackerDice, defenderDice) {
        if (attackerDice.length === 0 || defenderDice.length === 0) return;

        let diceToCompare = 0;
        let losses = {
            attacker: [],
            defender: []
        };

        attackerDice.length >= defenderDice.length ?
            diceToCompare = defenderDice.length :
            diceToCompare = attackerDice.length;

        for (let i = 0; i < diceToCompare; i++) {
            if (attackerDice[i] > defenderDice[i]) {
                losses.attacker.push(0);
                losses.defender.push(-1);
                this.defender.lives--;
            } else {
                losses.attacker.push(-1);
                losses.defender.push(0);
                this.attacker.lives--;
            }
        }

        //return object of losses
        return losses;

    }

    displayBattleResults(attackerRoll, defenderRoll, losses, attackElement, defendElement, compareElement) {
        let defenderStr = "";
        let attackerStr = "";
        let compareStr = "";

        for (let die of attackerRoll) {
            attackerStr += `<div class="die">${die}</div>`;
        }

        for (let die of defenderRoll) {
            defenderStr += `<div class="die die-white">${die}</div>`;
        }

        for (let result of losses.attacker) {
            if (result === 0) {
                compareStr += '<div class="results">&lt===WIN</div>';
            } else if (result === -1) {
                compareStr += '<div class="results">WIN===&gt</div>';
            } else {
                compareStr += '<div class="results">X</div>'
            }
        }

        // attackerResults.innerHTML = `<h1>Attack: ${attackerRoll} </h1>`;
        attackElement.innerHTML = attackerStr;
        compareElement.innerHTML = compareStr;
        defendElement.innerHTML = defenderStr;
    }


    //Returns an array of the requested number of dice rolled defaulted to 6 sides.
    roll(numDice = 1, numSides = 6) {
        if (numDice < 1 || numSides < 2) {
            console.log("rollDice requires at least 1 die and 2 sides");
            return [];
        }

        const diceArray = [];
        let result;

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
const risk = new DiceMatch({ attacker: jake, attackerLives: 10 }, { defender: elise, defenderLives: 10 }, DIE_SIDES, btnAttackerRoll, btnDefenderRoll, attackerNumDice, defenderNumDice, attackLives, defendLives);


