class PageElementsForRiskGame {
    constructor() {
        this.inputAttackerArmies = document.querySelector("#inputAttackerArmies");
        this.inputDefenderArmies = document.querySelector("#inputDefenderArmies");
        this.attackerResults = document.querySelector("#attackerResults");
        this.defenderResults = document.querySelector("#defenderResults");
        this.compareResults = document.querySelector("#compareResults");
        this.btnAttackerRoll = document.querySelector("#attackerRoll");
        this.btnDefenderRoll = document.querySelector("#defenderRoll");
        this.numOfAttackerDice = document.querySelector("#attackerNumDice");
        this.numOfDefenderDice = document.querySelector("#defenderNumDice");
        this.attackerLives = document.querySelector("#attackerLives");
        this.defenderLives = document.querySelector("#defenderLives");
        this.btnNewBattle = document.querySelector("#newBattle");
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

    constructor(dieSideCount = 6) {

        this.MIN_DIE_COUNT = 1;
        this.MAX_ATTACKER_DIE_COUNT = 3;
        this.MAX_DEFENDER_DIE_COUNT = 2;
        this.MIN_ATTACKER_TROOPS = 2;

        this.dieSideCount = dieSideCount;
        this.matchData = new DiceMatchData;
        this.elem = new PageElementsForRiskGame;
        this.rollBtnClickedStatus = [false, false];
        this.attackerTroopsRemaining = this.elem.inputAttackerArmies.value;
        this.defenderTroopsRemaining = this.elem.inputDefenderArmies.value;
        this.elem.attackerLives.innerHTML = `${this.attackerTroopsRemaining}`;
        this.elem.defenderLives.innerHTML = `${this.defenderTroopsRemaining}`;

        this.elem.btnAttackerRoll.addEventListener("click", () => this.checkAllPlayersPressRoll("attacker"));
        this.elem.btnDefenderRoll.addEventListener("click", () => this.checkAllPlayersPressRoll("defender"));

    }

    checkAllPlayersPressRoll(player) {
        if (this.isValidNumberOfDie()) {
            if (player === "attacker") {
                this.rollBtnClickedStatus[0] = true;
                this.elem.btnAttackerRoll.setAttribute("class", "clicked-button");
            }
            if (player === "defender") {
                this.rollBtnClickedStatus[1] = true;
                this.elem.btnDefenderRoll.setAttribute("class", "clicked-button");
            }
        } else {
            alert("Attacker dice rolled must be less than number of attacker armies remaining.  \r\nDefender dice rolled must be less than or equal to defender armies remaining.");
        }


        if (this.rollBtnClickedStatus[0] && this.rollBtnClickedStatus[1]) {
            this.initiateDiceRolls();
        }
    }

    isValidNumberOfDie() {

        const attackerDieCount = Number(this.elem.numOfAttackerDice.value);
        const defenderDieCount = Number(this.elem.numOfDefenderDice.value);
        const defenderTroops = Number(this.defenderTroopsRemaining);
        const attackerTroops = Number(this.attackerTroopsRemaining);


        if (attackerDieCount < this.MIN_DIE_COUNT ||
            attackerDieCount > this.MAX_ATTACKER_DIE_COUNT) {
            return false;
        }
        if (defenderDieCount < this.MIN_DIE_COUNT ||
            defenderDieCount > this.MAX_DEFENDER_DIE_COUNT) {
            return false;
        }
        if (defenderDieCount > defenderTroops) {
            //gets hung in here after several new battles
            return false;
        }

        if (attackerTroops < this.MIN_ATTACKER_TROOPS) {
            return false;
        }

        if (attackerTroops <= this.MAX_ATTACKER_DIE_COUNT &&
            attackerDieCount >= attackerTroops) {
            return false;
        }

        return true;

    }

    initiateDiceRolls() {
        this.matchData.clearLossesTally();
        this.attackerBattlesDefender();
        this.resetPageForNextRoll();
    }

    attackerBattlesDefender() {

        this.playersRollDice();
        this.comparePlayersDiceArrays();

        const showBattleResultsOnPage = new DiceMatchDisplayResults(this.matchData);
        showBattleResultsOnPage.displayBattleResults();
    }

    playersRollDice() {
        const attackerNumOfDice = this.elem.numOfAttackerDice.value;
        const defenderNumOfDice = this.elem.numOfDefenderDice.value;
        if (attackerNumOfDice <= 0 || defenderNumOfDice <= 0) return;

        this.matchData.attackerRollSorted = this.getSortedDiceRoll(attackerNumOfDice);
        this.matchData.defenderRollSorted = this.getSortedDiceRoll(defenderNumOfDice);
    }

    getSortedDiceRoll(numberOfDice) {
        const getDiceRoll = new Dice;
        let diceRoll = getDiceRoll.rollDice(numberOfDice);
        return getDiceRoll.sortLargeToSmall(diceRoll);
    }

    comparePlayersDiceArrays() {
        const attackerDice = this.matchData.attackerRollSorted;
        const defenderDice = this.matchData.defenderRollSorted;

        if (attackerDice.length === 0 || defenderDice.length === 0) return;

        let numOfDiceToCompare = 0;

        attackerDice.length >= defenderDice.length ?
            numOfDiceToCompare = defenderDice.length :
            numOfDiceToCompare = attackerDice.length;

        for (let i = 0; i < numOfDiceToCompare; i++) {
            this.compareTwoDice(attackerDice[i], defenderDice[i]);
        }
    }

    compareTwoDice(attackerDie, defenderDie) {
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

    resetPageForNextRoll() {
        this.rollBtnClickedStatus[0] = false;
        this.rollBtnClickedStatus[1] = false;
        this.elem.btnAttackerRoll.removeAttribute("class");
        this.elem.btnDefenderRoll.removeAttribute("class");
        this.elem.attackerLives.innerHTML = `${this.attackerTroopsRemaining}`;
        this.elem.defenderLives.innerHTML = `${this.defenderTroopsRemaining}`;
    }

    resetMatch() {
        this.attackerTroopsRemaining = this.elem.inputAttackerArmies.value;
        this.defenderTroopsRemaining = this.elem.inputDefenderArmies.value;
        this.elem.attackerLives.innerHTML = `${this.attackerTroopsRemaining}`;
        this.elem.defenderLives.innerHTML = `${this.defenderTroopsRemaining}`;
        this.matchData.clearLossesTally();
    }
}

class Dice {

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

    sortLargeToSmall(array) {
        array.sort((a, b) => {
            return b - a;
        });

        return array;
    }

    sortSmallToLarge(array) {
        array.sort((a, b) => {
            return a - b;
        });

        return array;
    }
}

class DiceMatchDisplayResults {

    constructor(dataFromMatch) {
        this.matchData = dataFromMatch;
        this.elem = new PageElementsForRiskGame;
    }

    displayBattleResults() {

        this.displayDiceDivs();
        this.displayWinnerOfRolls();
    }

    displayDiceDivs() {

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

    displayWinnerOfRolls() {

        let divsForDiceComparisons = "";

        for (let result of this.matchData.tallyOfLosses.attacker) {
            divsForDiceComparisons += this.createDivForWinner(result);
        }

        this.elem.compareResults.innerHTML = divsForDiceComparisons;
    }

    createDivForWinner(result) {

        if (result === 0) {
            return '<div class="results">&lt===WIN</div>';
        } else if (result === -1) {
            return '<div class="results">WIN===&gt</div>';
        } else {
            return '<div class="results">X</div>';
        }
    }
}