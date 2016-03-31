// Description:
//   Youbot the hubot - A hubot bot that's concerned about you, and provides motivation and encouragement.
//
// Dependencies:
//   slack adapter
//
// Primary Commands:
//   hubot get commands - Let's you know if hubot is operational and lets you know which commands are available.
//   hubot get quote - Provides a motivational quote from an array of pre-defined quotes, because we all need a little boost sometimes.
//   hubot add quote "<quote>" - Adds a quote to the array.
//   hubot cheer me up - Show me a cat.

// Additional Commands: 
//   hubot get weather <zipcode> - Gets the weather for the 5-digit zipcode provided.
//   hubot Do we have class today? - Let's you know which day it is and whether or not class is scheduled.

module.exports = function(robot) {

    // Function that takes a string and capitalize the first letter of every word.
    // Used to capitalize the robot name for healthcheck command.
    function toTitleCase(name) {
        return name.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    // If the "get commands" command is given, respond with the available commands.
    var healthcheckPattern = /get commands/i;
    robot.respond(healthcheckPattern, function(msg) {
        // Pass the robot name in to toTitleCase and assign the result to a variable.
        var robotName = toTitleCase(robot.name);
        msg.reply(
            "Hello! I am " + robotName + " Available commands:\n`@" + robot.name + 
            " get quote` or `inspire me` to brighten your day.\n`@" + robot.name + 
            " add quote \"<quote>\"` to add a new quote.\n`@" + robot.name + 
            " cheer me up` to get a picture that'll make you happy. \n`@" + robot.name + 
            " get weather <zipcode>` to get the weather.\n`@" + robot.name +
            " do we have class today?` to find out whether or not it's a class day."
        );
    });

    // Seed youbot with motivational quotes.
    var quotes = [
        "Everything is going to be 200 OK.",
        "You look nice today!",
        "The sound of typing makes me happy.",
        "You did well today! Did you know that?",
        "You yourself, as much as anybody in the entire universe, deserve your love and affection."
    ];

    // If the "get quote" or "inspire me" command is given, respond with one of the 
    // motivational quotes in the quotes array.
    var getQuotePattern = /get quote|inspire me/;
    robot.respond(getQuotePattern, function(msg) {
        var randomQuote = quotes[Math.floor(Math.random()*quotes.length)]; // Get a random quote.
        msg.reply(randomQuote); // Construct the reply with a random quote.
    });

    // If the "add quote <quote>" command is given, add the quote to the 
    // quotes array so it's an additional index to choose from when 
    // the "get quote" command is given.
    var addQuotePattern = /add quote ("|“)([^"“”]+)("|”)$/i;
    robot.respond(addQuotePattern, function(msg) {
        var newQuote = msg.match[2];
        quotes.push(newQuote); // This pushes the new quote parameter to the quote array.
        msg.reply("Quote added, nice work! Here it is: " + newQuote);
    });

    // Debugging command, "all quotes". 
    // Allows you to print the entire array of quotes.
    robot.respond(/all quotes/, function(msg) {
        msg.reply(quotes);
    });

    // My first try: If the "get weather <zip>" command is given, construct a weather URL
    // with the given 5 digit zipcode and reply with the weather.com URL.
    // Also respond with a little motivational message.
    //      var zipcodePattern = /get weather [0-9]{5}/;
    //      robot.respond(zipcodePattern, function(msg) {
    //          console.log(msg);
    //          var str = msg.message.text; // Take the message text and make it a variable.
    //         var msgArray = str.split(" "); // Split that message text into an array.
    //         var weatherZip = msgArray[3]; // Take the 4th index of the msgArray (which should be the zip) and turn it into a variable
    //         var weatherURL = "https://weather.com/weather/today/l/";
    //         // Construct the url to see the weather and send it with the reply.
    //         msg.reply("Here's the weather for " + weatherZip + ": " + weatherURL + weatherZip);
    //         msg.reply("But don't forget: no matter the weather, it's always sunny somewhere!");
    //     });
    // This works, but it's not really what I wanted it be.

    // The better way: If the "get weather <zip>" command is given, extract local weather
    // conditions via the Wunderground API, construct a weather URL with the given 
    // 5 digit zipcode and reply with the current conditions URL.
    
    var zipcodePattern = /get weather (\d+)/i;
    robot.respond(zipcodePattern, function(msg) {
        
        var baseURL, authToken, conditionsPath, zip, format;
        baseURL = "http://api.wunderground.com/api/";
        authToken = "501236368af9d0b8";
        conditionsPath = "/conditions/q/";
        zip = msg.match[1];
        format = ".json";

        return msg.http(baseURL + authToken + conditionsPath + zip + format).get()(function(err, res, body) {

            var data = JSON.parse(body)
            var locationName = data.current_observation.display_location.full;
            var locationConditions = data.current_observation.weather;
            var locationURL = data.current_observation.forecast_url;
            
            if (locationConditions === "Clear") {
                return msg.send(
                    "It's currently *" + locationConditions + "* in " + locationName + 
                    ". Enjoy the sun! If you want more information: " + locationURL
                );
            } else if (locationConditions === "Partly Cloudy") {
                return msg.send(
                    "It's currently *" + locationConditions + "* in " + locationName + 
                    ". There is *some* sun out there, but if you want more information: " + locationURL
                ); 
            } else {
                return msg.send(
                    "It's currently *" + locationConditions + "* in " + locationName + 
                    ". There's always sun, somewhere! Need more information? " + locationURL
                );
            }
        });
    });

    // When given the command "cheer me up", get a picture of a cat.
    var catPattern = /cheer me up/i;
    robot.respond(catPattern, function(msg) {
        return msg.http("http://random.cat/meow").get()(function(err, res, body) {
            return msg.send(JSON.parse(body).file);
        });
    });

    // If the question is asked, check which day it is.
    // If it's Monday or Wednesday, reply with the day
    // and confirm that it's a class day. If it's any other day,
    // reply with the day and confirm that there's no class.
    var dayPattern = /do we have class today\?/i;
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