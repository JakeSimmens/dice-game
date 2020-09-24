const DIE_SIDES = 6;
const btnNewBattle = document.querySelector("#newBattle");
const armyInput = document.querySelector("#armyPopup");
const inputAttackerArmies = document.querySelector("#inputAttackerArmies");
const inputDefenderArmies = document.querySelector("#inputDefenderArmies");
const playerRoll = document.querySelectorAll(".roll");

const btnStart = document.querySelector("#btnStart");
let riskDice = new DiceMatchAttackerVsDefender(DIE_SIDES);

btnNewBattle.addEventListener("click", async () => {
    armyInput.removeAttribute("class", "hideMe");
    armyInput.setAttribute("class", "showMeFlex");

    for (let player of playerRoll) {
        player.setAttribute("class", "hideMe");
    }

    const diceDisplay = document.querySelectorAll(".dice");
    for (let element of diceDisplay) {
        element.innerHTML = "<div></div>";
    }

});

btnStart.addEventListener("click", () => {
    riskDice.resetMatch();
    armyInput.removeAttribute("class", "showMeFlex");
    armyInput.setAttribute("class", "hideMe");

    for (let player of playerRoll) {
        player.removeAttribute("class", "hideMe");
        player.setAttribute("class", "showMeBlock");
    }

});

// function getArmyCounts() {
//     let attackerCount = inputAttackerArmies.value;
//     let defenderCount = inputDefenderArmies.value;

//     if (attackerCount === null ||
//         defenderCount === null ||
//         Number.isNaN(attackerCount) ||
//         Number.isNaN(defenderCount)) {
//         alert("Please enter numbers");
//         return [0, 0];
//     }

//     return [attackerCount, defenderCount];
// }



