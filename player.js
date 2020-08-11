class Player {
    constructor(name) {
        this.name = name;
        this.rollHistory = []; //array of arrays
        this.wins = 0;
        this.losses = 0;
    }

}

module.exports = { Player };