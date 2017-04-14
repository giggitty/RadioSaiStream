'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./stateHandlers');
var audioEventHandlers = require('./audioEventHandlers');

exports.handler = function(event, context, callback){
    try 
    {
        var alexa = Alexa.handler(event, context);
        alexa.appId = constants.appId;

        if (event.session.application.applicationId !== alexa.appId)
        {
            context.fail("Invalid Application ID");
        }

        alexa.dynamoDBTableName = constants.dynamoDBTableName;

        alexa.registerHandlers(
            stateHandlers.startModeIntentHandlers,
            stateHandlers.playModeIntentHandlers,
            stateHandlers.remoteControllerHandlers,
            stateHandlers.resumeDecisionModeIntentHandlers,
            audioEventHandlers
        );
        alexa.execute();
    }
    catch (e)
    {
        context.fail("Exception: " + e);
    }
    
};
