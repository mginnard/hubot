// Day checker.

var day = new Date();
var today = day.getDay();


module.exports = function(robot) {
    var dayPattern = /day/;
    robot.respond(dayPattern, function(msg) {
        if (today = 1) {
            msg.reply("It's Monday!");
        } else {
            msg.reply("Nope, it's not Monday.");
        };
    });
};