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
class DiceMatchFor2Players {

    constructor(
        { attacker, attackerLives: attackerRemainingLives } = {},
        { defender, defenderLives: defenderRemainingLives } = {},
        dieSideCount,
        btnAttackerRollDie, btnDefenderRollDie, inputAttackerNumOfDice, inputDefenderNumOfDice, displayAttackerLivesLeft, displayDefenderLivesLeft) {

        this.attackingPlayer = {
            player: attacker,
            livesRemaining: attackerRemainingLives,
            matchRollHistory: []
        };

        this.defendingPlayer = {
            player: defender,
            livesRemaining: defenderRemainingLives,
            matchRollHistory: []
        };

        this.dieSideCount = dieSideCount;
        this.inputAttackerNumOfDice = inputAttackerNumOfDice;
        this.inputDefenderNumOfDice = inputDefenderNumOfDice;
        this.attackLivesDisplay = displayAttackerLivesLeft;
        this.defendLivesDisplay = displayDefenderLivesLeft;
        this.rollBtnClickedStatus = [false, false];


        this.attackLivesDisplay.innerHTML = `LIVES: ${this.attackingPlayer.livesRemaining}`;
        this.defendLivesDisplay.innerHTML = `LIVES: ${this.defendingPlayer.livesRemaining}`;
        btnAttackerRollDie.addEventListener("click", () => this.readyToRoll("attacker"));
        btnDefenderRollDie.addEventListener("click", () => this.readyToRoll("defender"));

    }

    readyToRoll(player) {
        if (player === "attacker") {
            this.rollBtnClickedStatus[0] = true;
        }
        if (player === "defender") {
            this.rollBtnClickedStatus[1] = true;
        }
        if (this.rollBtnClickedStatus[0] && this.rollBtnClickedStatus[1]) {
            this.attackerBattlesDefender(this.inputAttackerNumOfDice.value, this.inputDefenderNumOfDice.value);
            this.rollBtnClickedStatus[0] = false;
            this.rollBtnClickedStatus[1] = false;
            this.attackLivesDisplay.innerHTML = `LIVES: ${this.attackingPlayer.livesRemaining}`;
            this.defendLivesDisplay.innerHTML = `LIVES: ${this.defendingPlayer.livesRemaining}`;
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

    attackerBattlesDefender(attackerNumOfDice = 1, defenderNumOfDice = 1) {
        if (attackerNumOfDice <= 0 || defenderNumOfDice <= 0) return;

        const attacker = this.attackingPlayer;
        const defender = this.defendingPlayer;

        const attackerRollSorted = this.largeToSmall(this.rollDice(attackerNumOfDice));
        const defenderRollSorted = this.largeToSmall(this.rollDice(defenderNumOfDice));

        attacker.matchRollHistory.push([...attackerRollSorted]);
        defender.matchRollHistory.push([...defenderRollSorted]);
        let tallyOfLosses = this.compareDiceArrays(attackerRollSorted, defenderRollSorted);

        this.displayBattleResults(attackerRollSorted, defenderRollSorted, tallyOfLosses,
            attackerResults, defenderResults, compareResults);

        return {
            attackerLosses: tallyOfLosses.attacker,
            defenderLosses: tallyOfLosses.defender,
            attackerRoll: attackerRollSorted,
            defenderRoll: defenderRollSorted
        }

    }

    //Pass in array of dice to compare
    //return: object of losses
    compareDiceArrays(attackerDice, defenderDice) {
        if (attackerDice.length === 0 || defenderDice.length === 0) return;

        let numOfDiceToCompare = 0;
        let tallyOfLosses = {
            attacker: [],
            defender: []
        };

        attackerDice.length >= defenderDice.length ?
            numOfDiceToCompare = defenderDice.length :
            numOfDiceToCompare = attackerDice.length;

        for (let i = 0; i < numOfDiceToCompare; i++) {
            if (attackerDice[i] > defenderDice[i]) {
                tallyOfLosses.attacker.push(0);
                tallyOfLosses.defender.push(-1);
                this.defendingPlayer.livesRemaining--;
            } else {
                tallyOfLosses.attacker.push(-1);
                tallyOfLosses.defender.push(0);
                this.attackingPlayer.livesRemaining--;
            }
        }

        //return object of losses
        return tallyOfLosses;

    }

    displayBattleResults(attackerRoll, defenderRoll, battleLosses, displayAttackerResults, displayDefenderResults, displayComparisonResults) {
        let divsForAttackerDice = "";
        let divsForDefenderDice = "";
        let divsForDiceComparisons = "";

        for (let die of attackerRoll) {
            divsForAttackerDice += `<div class="die">${die}</div>`;
        }

        for (let die of defenderRoll) {
            divsForDefenderDice += `<div class="die die-white">${die}</div>`;
        }

        for (let result of battleLosses.attacker) {
            if (result === 0) {
                divsForDiceComparisons += '<div class="results">&lt===WIN</div>';
            } else if (result === -1) {
                divsForDiceComparisons += '<div class="results">WIN===&gt</div>';
            } else {
                divsForDiceComparisons += '<div class="results">X</div>'
            }
        }

        // attackerResults.innerHTML = `<h1>Attack: ${attackerRoll} </h1>`;
        displayAttackerResults.innerHTML = divsForAttackerDice;
        displayComparisonResults.innerHTML = divsForDiceComparisons;
        displayDefenderResults.innerHTML = divsForDefenderDice;
    }


    //Returns an array of the requested number of dice rolled defaulted to 6 sides.
    rollDice(numDice = 1, numSidesOnDie = 6) {
        if (numDice < 1 || numSidesOnDie < 2) {
            console.log("rollDice requires at least 1 die and 2 sides");
            return [];
        }

        const diceRollResults = [];
        let singleDieResult;

        for (let i = 0; i < numDice; i++) {
            singleDieResult = Math.floor(Math.random() * numSidesOnDie + 1);
            diceRollResults.push(singleDieResult);
        }

        return diceRollResults;
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
const risk = new DiceMatchFor2Players({ attacker: jake, attackerLives: 10 }, { defender: elise, defenderLives: 10 }, DIE_SIDES, btnAttackerRoll, btnDefenderRoll, attackerNumDice, defenderNumDice, attackLives, defendLives);


