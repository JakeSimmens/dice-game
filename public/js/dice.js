const DIE_SIDES = 6;
const btnNewBattle = document.querySelector("#newBattle");
const armyInput = document.querySelector("#armyPopup");
const inputAttackerArmies = document.querySelector("#inputAttackerArmies");
const inputDefenderArmies = document.querySelector("#inputDefenderArmies");
const playerRoll = document.querySelectorAll(".roll");
const btnStart = document.querySelector("#btnStart");

let riskDice = new DiceMatchAttackerVsDefender(DIE_SIDES);

btnNewBattle.addEventListener("click", () => {
    prepareDisplayToGatherNewGameData();
});

btnStart.addEventListener("click", () => {

    if (validNewBattleArmyInput()) {
        startNewMatch();
    }

});

function prepareDisplayToGatherNewGameData() {
    armyInput.removeAttribute("class", "hideMe");
    armyInput.setAttribute("class", "showMeFlex");

    for (let player of playerRoll) {
        player.setAttribute("class", "hideMe");
    }

    const diceDisplay = document.querySelectorAll(".dice");
    for (let element of diceDisplay) {
        element.innerHTML = "<div></div>";
    }

}

function validNewBattleArmyInput() {
    if (inputAttackerArmies.value === "" || inputDefenderArmies.value === "") {
        return false;
    }

    return true;
}

function startNewMatch() {
    riskDice.resetMatch();
    prepareDisplayToStartGame();
}

function prepareDisplayToStartGame() {
    armyInput.removeAttribute("class", "showMeFlex");
    armyInput.setAttribute("class", "hideMe");

    for (let player of playerRoll) {
        player.removeAttribute("class", "hideMe");
        player.setAttribute("class", "showMeBlock");
    }
}



