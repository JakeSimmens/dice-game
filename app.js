const elemAttackerResults = document.querySelector("#attackerResults");
const elemDefenderResults = document.querySelector("#defenderResults");
const elemCompareResults = document.querySelector("#compareResults");
const btnAttackerRoll = document.querySelector("#attackerRoll");
const btnDefenderRoll = document.querySelector("#defenderRoll");
const elemNumOfAttackerDice = document.querySelector("#attackerNumDice");
const elemNumOfDefenderDice = document.querySelector("#defenderNumDice");
const elemAttackerLives = document.querySelector("#attackerLives");
const elemDefenderLives = document.querySelector("#defenderLives");

class RiskGame {
    constructor(...player) {
        this.player = player;
        this.numberOfPlayers = player.length;
        this.NUM_OF_DIE_SIDES = 6;
        this.currentPlayersTurn = 0;
        this.troopLocationsByPlayer = [];
        for (let i = 0; i < this.numberOfPlayers; i++) {
            this.troopLocationsByPlayer.push({});
        }
        this.currentBattle = undefined;
    }

    setupGameBoard() {
        if (this.troopLocationsByPlayer.length > 0) {
            console.log("game board already setup");
            return;
        }
        this._assignTroopsToLocations();
        this._assignStartingPlayer();
        this.startPlayerTurn();
    }

    _assignTroopsToLocations() {
        this.troopLocationsByPlayer[0].usa = 20;
        this.troopLocationsByPlayer[1].mexico = 20;
    }

    _assignStartingPlayer() {
        this.currentPlayersTurn = 0;
    }

    startPlayerTurn() {

        this.currentBattle = new DiceMatchAttackerVsDefender();


    }

    endPlayerTurn() {
        this.currentBattle = null;
        //next player
    }
}

class PageElementsForRiskGame {
    constructor() {
        this.attackerResults = document.querySelector("#attackerResults");
        this.defenderResults = document.querySelector("#defenderResults");
        this.compareResults = document.querySelector("#compareResults");
        this.btnAttackerRoll = document.querySelector("#attackerRoll");
        this.btnDefenderRoll = document.querySelector("#defenderRoll");
        this.numOfAttackerDice = document.querySelector("#attackerNumDice");
        this.numOfDefenderDice = document.querySelector("#defenderNumDice");
        this.attackerLives = document.querySelector("#attackerLives");
        this.defenderLives = document.querySelector("#defenderLives");
    }
}


class DiceMatchAttackerVsDefender {

    constructor(numOfAttackingTroops, numOfDefendingTroops, dieSideCount = 6) {

        this.attackerTroopsRemaining = numOfAttackingTroops;
        this.defenderTroopsRemaining = numOfDefendingTroops;
        this.dieSideCount = dieSideCount;
        this.elem = new PageElementsForRiskGame;

        // (
        //     { attacker, attackerLives: attackerRemainingLives } = {},
        //     { defender, defenderLives: defenderRemainingLives } = {},
        //     dieSideCount,
        //     btnAttackerRollDie, btnDefenderRollDie, inputAttackerNumOfDice, inputDefenderNumOfDice, displayAttackerLivesLeft, displayDefenderLivesLeft
        // ) 



        // this.attackingPlayer = {
        //     player: attacker,
        //     livesRemaining: attackerRemainingLives,
        //     matchRollHistory: []
        // };

        // this.defendingPlayer = {
        //     player: defender,
        //     livesRemaining: defenderRemainingLives,
        //     matchRollHistory: []
        // };

        // this.dieSideCount = dieSideCount;
        // this.inputAttackerNumOfDice = inputAttackerNumOfDice;
        // this.inputDefenderNumOfDice = inputDefenderNumOfDice;
        // this.attackLivesDisplay = displayAttackerLivesLeft;
        // this.defendLivesDisplay = displayDefenderLivesLeft;
        this.rollBtnClickedStatus = [false, false];


        this.elem.attackerLives.innerHTML = `LIVES: ${this.attackerTroopsRemaining}`;
        this.elem.defenderLives.innerHTML = `LIVES: ${this.defenderTroopsRemaining}`;
        this.elem.btnAttackerRoll.addEventListener("click", () => this.readyToRoll("attacker"));
        this.elem.btnDefenderRoll.addEventListener("click", () => this.readyToRoll("defender"));

    }

    readyToRoll(player) {
        if (player === "attacker") {
            this.rollBtnClickedStatus[0] = true;
        }
        if (player === "defender") {
            this.rollBtnClickedStatus[1] = true;
        }

        const elem = this.elem;

        if (this.rollBtnClickedStatus[0] && this.rollBtnClickedStatus[1]) {
            this.attackerBattlesDefender();
            this.rollBtnClickedStatus[0] = false;
            this.rollBtnClickedStatus[1] = false;
            elem.attackerLives.innerHTML = `LIVES: ${this.attackerTroopsRemaining}`;
            elem.defenderLives.innerHTML = `LIVES: ${this.defenderTroopsRemaining}`;
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

    attackerBattlesDefender() {
        const attackerNumOfDice = this.elem.numOfAttackerDice.value;
        const defenderNumOfDice = this.elem.numOfDefenderDice.value;
        if (attackerNumOfDice <= 0 || defenderNumOfDice <= 0) return;

        //need to refactor since attackingPlayer and defending player don't exist.
        //maybe create an constructor variable to hold the roll history.
        const attacker = this.attackingPlayer;
        const defender = this.defendingPlayer;

        const attackerRollSorted = this.largeToSmall(this.rollDice(attackerNumOfDice));
        const defenderRollSorted = this.largeToSmall(this.rollDice(defenderNumOfDice));

        attacker.matchRollHistory.push([...attackerRollSorted]);
        defender.matchRollHistory.push([...defenderRollSorted]);
        let tallyOfLosses = this.compareDiceArrays(attackerRollSorted, defenderRollSorted);

        this.displayBattleResults(attackerRollSorted, defenderRollSorted, tallyOfLosses,
            elemAttackerResults, elemDefenderResults, elemCompareResults);

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

//const risk = new DiceMatchAttackerVsDefender({ attacker: jake, attackerLives: 10 }, { defender: elise, defenderLives: 10 }, DIE_SIDES, btnAttackerRoll, btnDefenderRoll, elemNumOfAttackerDice, elemNumOfDefenderDice, elemAttackerLives, elemDefenderLives);
const risk = new DiceMatchAttackerVsDefender(20, 20, 6);


