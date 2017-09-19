import React from 'react';
import PropTypes from 'prop-types';
import { getCurrentWeather , parseQueryString , getDateFromSeconds } from 'components/utils/api';

import './results.css';

export default class Results extends React.Component {
	constructor(props) {
		super(props);

		let city = parseQueryString(this.props.location.search).city;

		this.state = {
			city: parseQueryString(this.props.location.search).city,
			weatherData: null,
			isWeatherDataLoaded: false
		}

		this.updateCurrentCity = (city) => {
			this.setState({
		    	city: city
		    })
		}

		this.updateWeatherData = (currentWeatherData) => {
			this.setState({
				weatherData: currentWeatherData,
				isWeatherDataLoaded: true
			})
		}
	}

	componentDidMount() {
		getCurrentWeather(this.state.city).then(this.updateWeatherData)
	}

	componentWillReceiveProps(nextProps) {
	    let city = parseQueryString(nextProps.location.search).city;

	    this.updateCurrentCity(city);
		getCurrentWeather(city).then(this.updateWeatherData)
	}

	render() {
		return (
			<section className="section-results">
				{this.state.isWeatherDataLoaded &&
					<WeatherCard weatherData={this.state.weatherData}/>}
			</section>
		)
	}
}

const WeatherCardHeader = (props) => {
	return (
		<div className="weather-card-header">
			<h1 className="weather-card-title">{props.city}</h1>
			<h4 className="weather-card-date">{props.date}</h4>
		</div>
	)
}

WeatherCardHeader.propTypes = {
	city: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired
}

const WeatherCardGraphic = (props) => {
	return (
		<div className="weather-graphic">
			<img className="weather-graphic-image" src={props.imageSrc} alt="Weather Image"/>
			<h3 className="weather-graphic-title">{props.weatherSummary}</h3>
		</div>
	)
}

WeatherCardGraphic.propTypes = {
	imageSrc: PropTypes.string.isRequired,
	weatherSummary: PropTypes.string.isRequired
}

const WeatherCardDescription = (props) => {
	return (
		<div className="weather-description">
			<label className="current-temp-label">{props.currentTemp}<span className="temperature-label">F</span></label>
			<label className="low-temp-label">{props.minTemp}<span className="temperature-label">F</span></label>
			<h4>Humidity: {props.humidity}</h4>
			<h4>Wind: {props.wind}</h4>
		</div>
	)
}

WeatherCardDescription.propTypes = {
	currentTemp: PropTypes.number.isRequired,
	minTemp: PropTypes.number.isRequired,
	humidity: PropTypes.string.isRequired,
	wind: PropTypes.string.isRequired
}

const WeatherCard = (props) => {
	let city = props.weatherData.name,
		date  = new Date().toDateString(),
		imageSrc = `/app/img/weather-icons/${props.weatherData.weather[0].icon}.svg`,
		weatherSummary = props.weatherData.weather[0].description,
		currentTemp = Math.round(props.weatherData.main.temp),
		minTemp = Math.round(props.weatherData.main.temp_min),
		humidity = `${props.weatherData.main.humidity}%`,
		wind = `${Math.round(props.weatherData.wind.speed)}mph`;
		
	return (
		<article className="weather-card">
			<WeatherCardHeader city={city} date={date} />
			<WeatherCardGraphic imageSrc={imageSrc} weatherSummary={weatherSummary} />
			<WeatherCardDescription currentTemp={currentTemp} minTemp={minTemp} humidity={humidity} wind={wind} />
		</article>
	)
}

WeatherCard.propTypes = {
	weatherData: PropTypes.shape({
		name: PropTypes.string.isRequired,
		weather: PropTypes.arrayOf(PropTypes.shape({
			icon: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired
		}).isRequired).isRequired,
		main: PropTypes.shape({
			humidity: PropTypes.number.isRequired,
			temp: PropTypes.number.isRequired,
			temp_min: PropTypes.number.isRequired
		}).isRequired,
		wind: PropTypes.shape({
			speed: PropTypes.number.isRequired
		}).isRequired
	}).isRequired
}