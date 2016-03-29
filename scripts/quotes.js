// Give bot an array of quotes to use at the beginning.
var quotes = [
    "Everything is going to be 200 OK.",
    "You look nice today!",
    "The sound of typing makes me happy.",
    "You did well today! Did you know that?"
];

// Return a single motivation from an array when given 
// the "give me a quote" or "inspire me" command.
module.exports = function(robot) {
    // Establish a pattern to match the quote command.
    var quotePattern = /quote/;
    robot.respond(quotePattern, function(msg) {
        // Pull a random quote from the quotes array.
        // Note: Because the quote should be random *every time*,
        // we need to re-assign randomQuote each time, and the 
        // function should be placed inside the .respond() method.
        var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
        // Pass the random quote into the reply.
        msg.reply(randomQuote);
    });
};

// TODO: If the command "add quote '<quote>'" is given, the quote is added to the array.