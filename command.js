
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


// myCommandLine((userInput) => {
//     if (userInput === "roll") {
//         console.log(rollDice(5));
//     }
// });