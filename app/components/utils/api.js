const appId = '6c75dec26d58953b30adb3ea878eb95c',
	apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

var getCurrentWeather = function(city) {
	return fetch(`${apiEndpoint}?q=${city}&type=accurate&APPID=${appId}&units=imperial`)
		.then((response) => (response.json()))
};

var parseQueryString = function(str) {
	var queryStr = str.split('?')[1],
		queryArr = queryStr.split('&');

	return queryArr.reduce(function(acc, item) {
		var key = item.split('=')[0],
			value = item.split('=')[1];

		acc[key] = value;

		return acc;
	}, {})
};

var getDateFromSeconds = function(seconds)  {
	var date = new Date(seconds * 1000),
		hour = date.getHours(),
		minute = date.getMinutes(),
		ampm;

	ampm = hour >= 12 ? 'p.m' : 'a.m';
	hour = hour % 12 === 0 ? 12 : hour % 12;
	minute = minute % 60 < 10 ? `0${minute%60}` : minute % 60;
	

	return `${hour}:${minute} ${ampm}`;
}

module.exports = {
	getCurrentWeather: getCurrentWeather,
	parseQueryString: parseQueryString,
	getDateFromSeconds: getDateFromSeconds
}