const DIE_SIDES = 6;
const btnNewBattle = document.querySelector("#newBattle");
const armyInput = document.querySelector("#armyPopup");
const inputAttackerArmies = document.querySelector("#inputAttackerArmies");
const inputDefenderArmies = document.querySelector("#inputDefenderArmies");
const btnStart = document.querySelector("#btnStart");
let riskDice = new DiceMatchAttackerVsDefender(DIE_SIDES);

btnNewBattle.addEventListener("click", async () => {
    btnNewBattle.setAttribute("class", "clicked-button");
    armyInput.removeAttribute("class", "hideMe");
    armyInput.setAttribute("class", "showMe");

});

btnStart.addEventListener("click", () => {
    let armyCounts = getArmyCounts();
    riskDice.resetMatch();
    armyInput.removeAttribute("class", "showMe");
    armyInput.setAttribute("class", "hideMe");

});

function getArmyCounts() {
    let attackerCount = inputAttackerArmies.value;
    let defenderCount = inputDefenderArmies.value;

    if (attackerCount === null ||
        defenderCount === null ||
        Number.isNaN(attackerCount) ||
        Number.isNaN(defenderCount)) {
        alert("Please enter numbers");
        return [0, 0];
    }

    return [attackerCount, defenderCount];
}



