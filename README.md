# weather-alexa-skill

This application demonstrates how the Amazon Alexa Skills are developed. This application is nothing but a amazon lambda which handles amazon skill events. I have used openweather APIs to collect weather data from the cities and prepares the meaningful weather report.

You can read more about developing alexa skills in the blog - https://medium.com/@jeevanpaatil/developing-amazon-alexa-skills-4546b2421af1

This is a live alexa skill whose invocation invocation name is "weather reporter".

Sample utterance to invole this skill is as below:
Alexa, ask weather reporter to tell me weather from New York

This input speech is recognized by alexa and based on the utterance best suited intent is selected. Utterances may contain intent slots too. JSON request is formed which contains information like userid, requestid, applicationid, intent name, intent slots and slot types. We are using same JSON structure to test the intent here in this application. 

Sample response from the intent is something like this ->

```json
{
	"version": "1.0",
	"response": {
		"shouldEndSession": true,
		"outputSpeech": {
			"type": "SSML",
			"ssml": "<speak> Weather in New York is Clear. Temperature is 10 degree celcius. Humidity is 37 percent. Wind speed is 5.01 meters per second. </speak>"
		}
	},
	"sessionAttributes": {},
	"userAgent": "ask-nodejs/1.0.25 Node/v8.9.4"
}
```
