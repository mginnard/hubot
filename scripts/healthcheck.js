// Responds with a health status when the <healthcheck> command is given.

// Take a string and capitalize the first letter of every word.
// Used to capitalize the robot name.
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

var healthcheckPattern = /healthcheck/i;

module.exports = function(robot) {
    var robotName = toTitleCase(robot.name);
    robot.respond(healthcheckPattern, function(msg) {
        msg.reply(
            "Hello! I'm " + robotName + " and everything is 200OK. Try `" + robot.name + " quote` to get a quote, `" + robot.name + " add quote` to add a new quote, or `" + robot.name + " weather <city>` to get the weather."
        );
    });
};