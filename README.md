### youbot the hubot

A hubot / slackbot designed to provide you with motivational quotes, pictures of cats. Also provides you with the weather for any given zipcode, and can check whether it's a JS class day.

#### Available Commands

Primary Commands:

- `hubot> hubot get commands` - Lets you know if hubot is operational which commands are available.
- `hubot> hubot get quote` - Provides a motivational quote from an array of pre-defined quotes, because we all need a little boost sometimes.
- `hubot> hubot add quote "<quote>"` - Adds a quote to the quotes array for later use.
- `hubot> hubot cheer me up` - Show me a cat.

Secondary Commands: 
    
- `hubot> hubot get weather <zipcode>` - Gets the weather for the 5-digit zipcode provided.
- `hubot> hubot do we have class today?` - Let's you know which day it is and whether or not class is scheduled.
- `hubot> hubot help` - All core commands that hubot knows about.


#### Getting Started & Running Hubot Locally

Need help getting up and running with hubot? Start with the [GitHub Hubot Documentation](https://github.com/github/hubot/).

You can test hubot by running the following, however some plugins will not
behave as expected unless the [environment variables](#configuration) they rely
upon have been set.

You can start hubot locally by running:

    % bin/hubot

You can start hubot with Slack by running:

    % $ HUBOT_SLACK_TOKEN=<your_token_here> ./bin/hubot --adapter slack


#### Getting Started with Hubot

Need help getting up and running with hubot? Start with the [GitHub Hubot Documentation](https://github.com/github/hubot/).