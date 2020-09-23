const DIE_SIDES = 6;
const btnNewBattle = document.querySelector("#newBattle");

btnNewBattle.addEventListener("click", async () => {
    btnNewBattle.setAttribute("class", "clicked-button");
    let armyCounts = await getArmyCounts();
    new DiceMatchAttackerVsDefender(armyCounts[0], armyCounts[1], DIE_SIDES);
});

async function getArmyCounts() {
    let attackerCount = await Number(prompt("Attacker army count."));
    let defenderCount = await Number(prompt("Defender army count."));

    if (Number.isNaN(attackerCount) || Number.isNaN(defenderCount)) {
        alert("Please enter numbers");
        return [0, 0];
    }

    return [attackerCount, defenderCount];
}



