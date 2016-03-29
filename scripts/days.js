// This tells you what day it is,
// and whether or not we have class today.

// Get the exact date and time.
var day = new Date();
// From this, check which day it is.
// 0 is Sunday, 1 is Monday, and so on.
var today = day.getDay();

module.exports = function(robot) {
    // Establish a pattern that accepts the question 
    // regardless of capitalization.
    var dayPattern = "/do we have class today?/i";
    // If the question is asked, check which day it is.
    // If it's Monday or Wednesday, reply with the day
    // and confirm with the class. If it's any other day,
    // reply with the day and confirm that there's no class.
    robot.respond(dayPattern, function(msg) {
        if (today = 1) { // If today's Monday...
            msg.reply("Today's Monday. Class is at 6:30.");
        } else if (today = 3) { // Or else if today's Wednesday...
            msg.reply("Today's Wednesday. You have class at 6:30.");
        } else { // If it's neither of those...
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