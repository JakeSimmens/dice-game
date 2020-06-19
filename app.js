//process.stdout.write("hello from stdout\n");
console.log("***START***");

//set to read characters
process.stdin.setEncoding("utf8");
//turn on process to read command line input
process.stdin.resume();
//read data entered in command line
// process.stdin.on("data", (data) => {

//     //end command line reading once 'exit' is typed
//     if (data === "exit\n") {

//         process.stdin.pause();
//         return;
//     }
//     console.log(data);
//     console.log(`length: ${data.length}`);
// });

function getInput(callback) {
    let myData;

    process.stdin.resume();

    //prompt for input
    process.stdout.write("\n>>> ");

    //reads input until ended
    process.stdin.on("data", function (data) {


        //end command line reading once 'exit' is typed
        if (data === "exit\n") {

            process.stdin.pause();
            console.log("===END===");
            return;
        }

        myData = data;

        console.log(`input: ${myData}  length: ${data.length}`);
        callback(data);
        //process.stdin.pause();
        //return myData;
        process.stdout.write(">>> ");
    });


}

getInput((userInput) => {
    console.log(`You typed: ${userInput.trim()}`);
});

//console.log(result);