// Create a variable called today, that maps to a
var day = new Date();
var today = day.getDay();

module.exports = function(robot) {
    var dayPattern = "/do we have class today?/i";
    robot.respond(dayPattern, function(msg) {
        if (today = 1) {
            msg.reply("Today's Monday. Class is at 6:30.");
        } else if (today = 3) {
            msg.reply("Today's Wednesday. You have class at 6:30.");
        } else {
            if (today = 0) {
                msg.reply("Today's Sunday. The JS class only meets on Mondays and Wednesdays.");
            } else if (today = 2) {
                msg.reply("It's Tuesday. You have class on Mondays and Wednesdays.");
            } else if (today = 4) {
                msg.reply("It's Thursday. No class today.");
            } else if (today = 5) {
                msg.reply("It's Friday. Your next class is on Monday.");
            } else if (today = 6) {
                msg.reply("It's Saturday. Enjoy the weekend! Class meets Mondays and Wednesdays.");
            };
        };
    });
};