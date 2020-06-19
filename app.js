
//Gives user ability to interact with their program on the command line.
//Pass in a call back function that will run based on the commands entered.
//Typing 'exit' will terminate the function
function myCommandLine(callback) {

    console.log("= = = = MY COMMAND LINE = = = =");
    process.stdin.setEncoding("utf8");  //set to read characters
    process.stdin.resume();  //turn on reading user input

    //prompt for input...another way to do console.log()
    process.stdout.write("\n>>> ");

    //reads command line until exit is typed
    process.stdin.on("data", function (data) {

        const cmdString = data.trim();

        if (cmdString === "exit") {

            process.stdin.pause();  //pause reading user input
            console.log("=======END=======");
            return;
        }

        //console.log(`length: ${cmdString.length}`);
        callback(cmdString);
        process.stdout.write("\n>>> ");
    });

}

//Returns an array of the requested number of dice rolled defaulted to 6 sides.
function rollDice(numDice, numSides = 6) {

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

    return diceArray;

}

myCommandLine((userInput) => {
    if (userInput === "roll") {
        console.log(rollDice(5));
    }
});

