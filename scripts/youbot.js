// Set up regex patterns for each command:
// hubot healthcheck - Let's you know if hubot is operational.
// hubot get quote - Provides a motivational quote from an array of pre-defined quotes, because we all need a little boost sometimes.
// hubot add quote <quote>  - Adds a quote to the array.
// hubot get weather <zipcode>  - Adds a quote to the array.
var healthcheckPattern = /healthcheck/i;
var getQuotePattern = /get quote|inspire me/;
var addQuotePattern = /add quote .*/;
var zipcodePattern = /get weather [0-9]{5}/;

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

    robot.respond(getQuotePattern, function(msg) {
        // Pull a random quote from the quotes array.
        // Note: Because the quote should be random, we need 
        // to re-assign randomQuote every time the command is run, 
        // therefore this goes inside the .respond() method.
        var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
        // Construct the reply with a random quote.
        msg.reply(randomQuote);
    });

    robot.respond(addQuotePattern, function(msg) {
        var newQuote = addQuotePattern.match(msg);
        console.log("msg is " + msg);
        console.log("newQuote is " + newQuote);
        quotes.push(newQuote); // This pushes the passed in parameter to the quote array.
        console.log(quotes);
    });

    robot.respond(zipcodePattern, function(msg) {
        var str = msg.message.text; // Take the message text and make it a variable.
        var msgArray = str.split(" "); // Split that message text into an array.
        var weatherZip = msgArray[3]; // Take the 4th index of the msgArray (which should be the zip) and turn it into a variable
        var weatherURL = "https://weather.com/weather/today/l/";
        // Construct the url to see the weather and send it with the reply.
        msg.reply("Here's the weather for " + weatherZip + ": " + weatherURL + weatherZip);
        msg.reply("But don't forget: no matter the weather, it's always sunny somewhere!");
    });

};