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
        this.btnNewBattle = document.querySelector("#newBattle");
    }
}

//test data
const DIE_SIDES = 6;
const jake = new Player("Jake");
const elise = new Player("Elise");
// const isaac = new Player("Isaac");
// const elijah = new Player("Elijah");

const btnNewBattle = document.querySelector("#newBattle");

btnNewBattle.addEventListener("click", () => {
    btnNewBattle.setAttribute("class", "clicked-button");
    new DiceMatchAttackerVsDefender(15, 15, DIE_SIDES);
})




