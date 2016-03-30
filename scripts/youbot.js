// Available commands for youbot:
// healthcheck - Let's you know if hubot is operational and lets you know which commands are available.
// get quote - Provides a motivational quote from an array of pre-defined quotes, because we all need a little boost sometimes.
// add quote <quote>  - Adds a quote to the array.
// get weather <zipcode>  - Adds a quote to the array.
// Do we have class today? - Let's you know which day it is and whether or not class is scheduled.

// Set up regex patterns for each command:
var healthcheckPattern = /healthcheck/i;
var getQuotePattern = /get quote|inspire me/;
var addQuotePattern = /add quote .*/;
var zipcodePattern = /get weather [0-9]{5}/;
var dayPattern = /do we have class today?/i;

// Seed hubot with motivational quotes.
var quotes = [
    "Everything is going to be 200 OK.",
    "You look nice today!",
    "The sound of typing makes me happy.",
    "You did well today! Did you know that?"
];

// Function that takes a string and capitalize the first letter of every word.
// Used to capitalize the robot name for healthcheck command.
function toTitleCase(name) {
    return name.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

// Return a motivational quote from an array when given 
// the "give me a quote" or "inspire me" command.
module.exports = function(robot) {

    // If the "healthcheck" command is given, respond with the 
    robot.respond(healthcheckPattern, function(msg) {
        // Pass the robot name in to toTitleCase and assign the result to a variable.
        var robotName = toTitleCase(robot.name);
        msg.reply(
            "Hello! I am " + robotName + " and everything is going to be 200 OK. Try `" 
            + robot.name + " get quote` to brighten your day, `" + robot.name + 
            " add quote` to add a new quote, or `" + robot.name + 
            " get weather <zipcode>` to get the weather."
        );
    });

    // If the "get quote" command is given, respond with one of the 
    // motivational quotes in the quotes array.
    robot.respond(getQuotePattern, function(msg) {
        // Pull a random quote from the quotes array.
        // Note: Because the quote should be random, we need 
        // to re-assign randomQuote every time the command is run, 
        // therefore this goes inside the .respond() method.
        var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
        // Construct the reply with a random quote.
        msg.reply(randomQuote);
    });

    // // If the "add quote <quote>" command is given, add the quote to the 
    // // quotes array so it's an additional index to choose from when 
    // // the "get quote" command is given.
    // robot.respond(addQuotePattern, function(msg) {
    //     var newQuote = addQuotePattern.match(msg);
    //     console.log("msg is " + msg);
    //     console.log("newQuote is " + newQuote);
    //     quotes.push(newQuote); // This pushes the passed in parameter to the quote array.
    //     console.log(quotes);
    // });

    // If the "get weather <zip>" command is given, construct a weather URL
    // with the given 5 digit zipcode and reply with the weather.com URL.
    // Also respond with a little motivational message.
    robot.respond(zipcodePattern, function(msg) {
        var str = msg.message.text; // Take the message text and make it a variable.
        var msgArray = str.split(" "); // Split that message text into an array.
        var weatherZip = msgArray[3]; // Take the 4th index of the msgArray (which should be the zip) and turn it into a variable
        var weatherURL = "https://weather.com/weather/today/l/";
        // Construct the url to see the weather and send it with the reply.
        msg.reply("Here's the weather for " + weatherZip + ": " + weatherURL + weatherZip);
        msg.reply("But don't forget: no matter the weather, it's always sunny somewhere!");
    });

    // If the question is asked, check which day it is.
    // If it's Monday or Wednesday, reply with the day
    // and confirm that it's a class day. If it's any other day,
    // reply with the day and confirm that there's no class.
    robot.respond(dayPattern, function(msg) {
        // Get the exact date and time.
        var day = new Date();
        // From this, check which day it is.
        // 0 is Sunday, 1 is Monday, and so on.
        var today = day.getDay();

        if (today === 1) { // If today's Monday...
            msg.reply("Today's Monday. Class is at 6:30.");
        } else if (today === 3) { // Or else if today's Wednesday...
            msg.reply("Today's Wednesday. You have class at 6:30.");
        } else { // If it's neither of those...
            if (today === 0) {
                msg.reply("Today's Sunday. The JS class only meets on Mondays and Wednesdays.");
            } else if (today === 2) {
                msg.reply("It's Tuesday. You have class on Mondays and Wednesdays.");
            } else if (today === 4) {
                msg.reply("It's Thursday. No class today.");
            } else if (today === 5) {
                msg.reply("It's Friday. Your next class is on Monday.");
            } else if (today === 6) {
                msg.reply("It's Saturday. Enjoy the weekend! Class meets Mondays and Wednesdays.");
            };
        };
    });

};