var lambda = require('../app.js');
var context = require('./context.js');
var mockEvent = require('./CityWeatherEvent.json');

var mockContext = new context();

function callback(err, data){
	if(err){
		console.log('error: '+ error);
	}
	else{
		console.log(data);
	}
}

lambda.handler(mockEvent, mockContext, callback)