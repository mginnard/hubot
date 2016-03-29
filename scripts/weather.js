// Open Weather API: http://openweathermap.org/current
// Example Request for 94114 zip code: http://api.openweathermap.org/data/2.5/weather?zip=94114&APPID=86fb953a79eb4050f91fe514981d02e0
// API KEY: 86fb953a79eb4050f91fe514981d02e0

// Set up a function that takes a zip code and fetches the current weather.

var zipcodePattern = /weather [0-9]{5}/;

module.exports = function(robot) {
    robot.respond(zipcodePattern, function(msg) {
        var zipcode = new RegExp(zipcodePattern);
        return console.log(zipcode.toString());
        msg.reply("Here's the weather for zipcode");
    });
};