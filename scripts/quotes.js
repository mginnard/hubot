// Returns a single motivation from an array when given the "give me a quote" or "inspire me" command.
// If the command "add quote '<quote>'" is given, the quote is added to the array.

var quotes = [
    "Everything is going to be 200 OK.",
    "You look nice today!",
    "The sound of typing makes me happy.",
    "You did well today! Did you know that?"
];

module.exports = function(robot) {
    var quotePattern = /quote/;
    robot.respond(quotePattern, function(msg) {
        var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
        msg.reply(randomQuote);
    });
};