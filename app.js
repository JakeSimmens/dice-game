const DIE_SIDES = 6;
const btnNewBattle = document.querySelector("#newBattle");
const armyInput = document.querySelector("#armyPopup");
const inputAttackerArmies = document.querySelector("#inputAttackerArmies");
const inputDefenderArmies = document.querySelector("#inputDefenderArmies");
const btnStart = document.querySelector("#btnStart");

btnNewBattle.addEventListener("click", async () => {
    btnNewBattle.setAttribute("class", "clicked-button");
    armyInput.removeAttribute("class", "hideMe");
    armyInput.setAttribute("class", "showMe");

});

btnStart.addEventListener("click", () => {
    let armyCounts = getArmyCounts();
    armyInput.removeAttribute("class", "showMe");
    armyInput.setAttribute("class", "hideMe");
    new DiceMatchAttackerVsDefender(armyCounts[0], armyCounts[1], DIE_SIDES);
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



