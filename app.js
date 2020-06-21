
//Requires class Players as arguments for constructor
class Battle {
    //compare rolls
    //choose how many die to roll
    constructor(...contenders) {
        //list of players
        this.players = [];
        this.lastRoll = [];
        for (let contender of contenders) {
            this.players.push(contender);
        };
    }

    get numPlayers() {
        return this.players.length;
    }

    get whosTurn() {
        return this.players[0];
    }

    nextPlayer() {
        let turnOver = this.players.shift();
        this.players.push(turnOver);
        return this.players[0];
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

        this.lastRoll = diceArray;

        return this.lastRoll;

    }

    largeToSmall() {
        this.lastRoll.sort((a, b) => {
            return b - a;
        });
    }

    smallToLarge() {
        this.lastRoll.sort((a, b) => {
            return a - b;
        });
    }

}

class Player {
    constructor(name) {
        this.name = name;
        this.lastRoll = [];
        this.wins = 0;
        this.losses = 0;
    }

    get winPercent() {
        if (!(this.wins + this.losses)) {
            return 0;
        }
        return this.wins / (this.wins + this.losses);
    }

    recordWin() {
        this.wins++;
    }

    recordLoss() {
        this.losses++;
    }
}

//test data
const jake = new Player("Jake");
const elise = new Player("Elise");
const isaac = new Player("Isaac");
const elijah = new Player("Elijah");
const risk = new Battle(jake, elise, isaac, elijah);

