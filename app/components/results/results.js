import React from 'react';
import PropTypes from 'prop-types';
import { getCurrentWeather , parseQueryString , getDateFromSeconds , getForecast} from 'components/utils/api';

import './results.css';

export default class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			city: parseQueryString(this.props.location.search).city,
			weatherListData: null,
			isWeatherListDataLoaded: false
		}

		this.updateCurrentCity = (city) => {
			if (city) {
				this.setState({
			    	city: city
			    })
			}
		}

		this.updateForecast = (currentForecast) => {
			this.setState({
				weatherListData: currentForecast.list,
				isWeatherListDataLoaded: true
			})
		}
	}

	componentDidMount() {
		getForecast(this.state.city).then(this.updateForecast);
	}

	componentWillReceiveProps(nextProps) {
	    let city = parseQueryString(nextProps.location.search).city;

	    this.updateCurrentCity(city);
		getForecast(city).then(this.updateForecast);
	}

	render() {
		return (
			<section className="section--results">
				<h1 className="section--title">{this.state.city}</h1>
				<WeatherCardList weatherDataList={this.state.weatherListData} />
			</section>
		)
	}
}

/*----- WeatherCardHeader -----*/

const WeatherCardHeader = (props) => {
	let {dayOfWeek, calendarDate} = props;

	return (
		<div className="weather-card-header">
			<h2 className="weather-card-title">{dayOfWeek}</h2>
			<h2 className="weather-card-date">{calendarDate}</h2>
		</div>
	)
}

WeatherCardHeader.propTypes = {
	dayOfWeek: PropTypes.string.isRequired,
	calendarDate: PropTypes.string.isRequired
}

/*----- WeatherCardGraphic -----*/

const WeatherCardGraphic = (props) => {
	let { iconSrc, weatherSummary } = props;

	return (
		<div className="weather-graphic">
			<img className="weather-graphic-image" src={require(`img/${iconSrc}.svg`)} alt="Weather Image"/>
			<h3 className="weather-graphic-title">{weatherSummary}</h3>
		</div>
	)
}

WeatherCardGraphic.propTypes = {
	iconSrc: PropTypes.string.isRequired,
	weatherSummary: PropTypes.string.isRequired
}

/*----- WeatherCardDescription -----*/

const WeatherCardDescription = (props) => {
	let { currentTemp, humidity, wind } = props;

	return (
		<div className="weather-description">
			<label className="current-temp-label">{currentTemp}<span className="temperature-label">F</span></label>
			<h4>Humidity: {humidity}</h4>
			<h4>Wind: {wind}</h4>
		</div>
	)
}

WeatherCardDescription.propTypes = {
	currentTemp: PropTypes.number.isRequired,
	humidity: PropTypes.string.isRequired,
	wind: PropTypes.string.isRequired
}

/*----- WeatherCard ----*/

const WeatherCard = (props) => {
	let date = new Date(props.weatherData.dt * 1000),
		dayOfWeek = date.toDateString().split(' ')[0],
		calendarDate  = `${date.getMonth() + 1}/${date.getDate()}`,
		iconSrc = props.weatherData.weather[0].icon,
		weatherSummary = props.weatherData.weather[0].description,
		currentTemp = Math.round(props.weatherData.main.temp),
		humidity = `${props.weatherData.main.humidity}%`,
		wind = `${Math.round(props.weatherData.wind.speed)}mph`;
		
	return (
		<article className="weather-card">
			<WeatherCardHeader dayOfWeek={dayOfWeek} calendarDate={calendarDate} />
			<WeatherCardGraphic iconSrc={iconSrc} weatherSummary={weatherSummary} />
			<WeatherCardDescription currentTemp={currentTemp} humidity={humidity} wind={wind} />
		</article>
	)
}

const WeatherCardList = (props) => {
	if (props.weatherDataList) {
		let createWeatherCardItem = (weatherItem) => (<WeatherCard key={weatherItem.dt} weatherData={weatherItem} />),
			filterWeatherCardArr = (weatherItem, index) => (index % 8 === 0),
			weatherCardArr = props.weatherDataList.map(createWeatherCardItem).filter(filterWeatherCardArr);

		return (
			<div className="weather-card-list">
				{weatherCardArr}
			</div>
		)
	}

	return (
		<h1>Loading...</h1>
	)
}