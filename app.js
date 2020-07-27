const elemAttackerResults = document.querySelector("#attackerResults");
const elemDefenderResults = document.querySelector("#defenderResults");
const elemCompareResults = document.querySelector("#compareResults");
const btnAttackerRoll = document.querySelector("#attackerRoll");
const btnDefenderRoll = document.querySelector("#defenderRoll");
const elemNumOfAttackerDice = document.querySelector("#attackerNumDice");
const elemNumOfDefenderDice = document.querySelector("#defenderNumDice");
const elemAttackerLives = document.querySelector("#attackerLives");
const elemDefenderLives = document.querySelector("#defenderLives");

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

class DiceMatchData {
    constructor() {
        this.attackerRollSorted = [];
        this.defenderRollSorted = [];
        this.tallyOfLosses = {
            attacker: [],
            defender: []
        };
    }

    clearLossesTally() {
        this.tallyOfLosses = { attacker: [], defender: [] };
    }

}

class DiceMatchAttackerVsDefender {

    constructor(numOfAttackingTroops, numOfDefendingTroops, dieSideCount = 6) {

        this.attackerTroopsRemaining = numOfAttackingTroops;
        this.defenderTroopsRemaining = numOfDefendingTroops;
        this.dieSideCount = dieSideCount;
        this.matchData = new DiceMatchData;

        this.elem = new PageElementsForRiskGame;
        this.rollBtnClickedStatus = [false, false];
        this.elem.attackerLives.innerHTML = `LIVES: ${this.attackerTroopsRemaining}`;
        this.elem.defenderLives.innerHTML = `LIVES: ${this.defenderTroopsRemaining}`;
        this.elem.btnAttackerRoll.addEventListener("click", () => this._checkAllPlayersPressRoll("attacker"));
        this.elem.btnDefenderRoll.addEventListener("click", () => this._checkAllPlayersPressRoll("defender"));

    }

    _checkAllPlayersPressRoll(player) {
        if (player === "attacker") {
            this.rollBtnClickedStatus[0] = true;
        }
        if (player === "defender") {
            this.rollBtnClickedStatus[1] = true;
        }

        if (this.rollBtnClickedStatus[0] && this.rollBtnClickedStatus[1]) {
            this._initiateDiceRolls();
        }
    }

    _initiateDiceRolls() {
        this.matchData.clearLossesTally();
        this._attackerBattlesDefender();
        this.rollBtnClickedStatus[0] = false;
        this.rollBtnClickedStatus[1] = false;
        this.elem.attackerLives.innerHTML = `LIVES: ${this.attackerTroopsRemaining}`;
        this.elem.defenderLives.innerHTML = `LIVES: ${this.defenderTroopsRemaining}`;
    }

    _attackerBattlesDefender() {
        const attackerNumOfDice = this.elem.numOfAttackerDice.value;
        const defenderNumOfDice = this.elem.numOfDefenderDice.value;
        if (attackerNumOfDice <= 0 || defenderNumOfDice <= 0) return;

        this.matchData.attackerRollSorted = this.largeToSmall(this.rollDice(attackerNumOfDice));
        this.matchData.defenderRollSorted = this.largeToSmall(this.rollDice(defenderNumOfDice));

        this._compareDiceArrays();
        this._displayBattleResults();

    }

    _compareDiceArrays() {
        const attackerDice = this.matchData.attackerRollSorted;
        const defenderDice = this.matchData.defenderRollSorted;

        if (attackerDice.length === 0 || defenderDice.length === 0) return;

        let numOfDiceToCompare = 0;

        attackerDice.length >= defenderDice.length ?
            numOfDiceToCompare = defenderDice.length :
            numOfDiceToCompare = attackerDice.length;

        for (let i = 0; i < numOfDiceToCompare; i++) {
            this._compareTwoDice(attackerDice[i], defenderDice[i]);
        }
    }

    _compareTwoDice(attackerDie, defenderDie) {
        const data = this.matchData;

        if (attackerDie > defenderDie) {
            data.tallyOfLosses.attacker.push(0);
            data.tallyOfLosses.defender.push(-1);
            this.defenderTroopsRemaining--;
        } else {
            data.tallyOfLosses.attacker.push(-1);
            data.tallyOfLosses.defender.push(0);
            this.attackerTroopsRemaining--;
        }
    }

    _displayBattleResults() {

        this._displayDiceDivs();
        this._displayWinnerOfRolls();
    }

    _displayDiceDivs() {

        const data = this.matchData;
        let divsForAttackerDice = "";
        let divsForDefenderDice = "";

        for (let die of data.attackerRollSorted) {
            divsForAttackerDice += `<div class="die">${die}</div>`;
        }

        for (let die of data.defenderRollSorted) {
            divsForDefenderDice += `<div class="die die-white">${die}</div>`;
        }

        this.elem.attackerResults.innerHTML = divsForAttackerDice;
        this.elem.defenderResults.innerHTML = divsForDefenderDice;
    }

    _displayWinnerOfRolls() {

        let divsForDiceComparisons = "";

        for (let result of this.matchData.tallyOfLosses.attacker) {
            divsForDiceComparisons += this._createDivForWinner(result);
        }

        this.elem.compareResults.innerHTML = divsForDiceComparisons;
    }

    _createDivForWinner(result) {

        if (result === 0) {
            return '<div class="results">&lt===WIN</div>';
        } else if (result === -1) {
            return '<div class="results">WIN===&gt</div>';
        } else {
            return '<div class="results">X</div>';
        }
    }


    rollDice(numDice = 1, numOfSidesOnDie = 6) {
        if (numDice < 1 || numOfSidesOnDie < 2) {
            console.log("rollDice requires at least 1 die and 2 sides");
            return [];
        }

        const diceRollResults = [];
        let singleDieResult;

        for (let i = 0; i < numDice; i++) {
            singleDieResult = Math.floor(Math.random() * numOfSidesOnDie + 1);
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


