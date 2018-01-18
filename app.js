/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const weather = require('./model/weather');

const APP_ID = '****';

const HELP_MESSAGE = 'Ask me to provide weather information from city.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const SKILL_NAME = 'Weather Reporter';

const handlers = {
    'LaunchRequest': function () {
        this.emit('WelcomeMessage');
    },
    'WelcomeMessage': function () {
        this.emit(':tellWithCard', HELP_MESSAGE, SKILL_NAME, HELP_REPROMPT);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'TodaysWeather': function () {
        this.emit(':tell', HELP_MESSAGE);
    },
    'CityWeather': function () {
        const city = this.event.request.intent.slots.city.value;
        var _self = this;

        weather.weatherFromCity(city, function(data) {
            if(data) {
              if(data.cod == '404') {
                _self.emit(':tell', 'Sorry! Could not gather weather information from the provided city. Please try again!');
              } else {
                const sky = data.weather[0].main;
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const windspeed = data.wind.speed;
                var weather = "Weather in " + city + " is " + sky + ".";
                weather = weather + " Temperature is " + temp + " degree celcius.";
                weather = weather + " Humidity is " + humidity + " percent.";
                weather = weather + " Wind speed is " + windspeed + " meters per second.";
                _self.emit(':tell', weather);
              }
            } else {
              _self.emit(':tell', 'Sorry! Could not recognize the city. Please try again!');
            }
        });
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
