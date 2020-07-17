class Player {
    constructor(name) {
        this.name = name;
        this.lastRoll = [];
        this.wins = 0;
        this.losses = 0;
    }

    get winningPercentage() {
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