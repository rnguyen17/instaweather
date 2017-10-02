import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './weather.css';

export default class WeatherForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cityToSearch: '',
			currentCityInput: ''
		}

		this.resetCityInput = (event) => {
			this.textInput.blur();

			this.setState({
				currentCityInput: ''
			})
		}

		this.updateCurrentCityInput = (event) => {
			let currentCityInput = event.target.value;

			this.setState({
				cityToSearch: currentCityInput,
				currentCityInput: currentCityInput
			})
		}
	}

	render() {
		let { weatherFormPlaceholder }= this.props,
			{ cityToSearch, currentCityInput } = this.state;

		return (
			<form className="form--weather">
				<input 
					className="input--weather"
					autoComplete="off"
					required
					name="city"
					type="textfield"
					placeholder={weatherFormPlaceholder}
					value={currentCityInput}
					onChange={this.updateCurrentCityInput}
					ref={(input) => { this.textInput = input; }}/>
				<Link to={{
						pathname: '/results',
						search: '?city=' + cityToSearch	
					}}>
					<button 
						className="button button--submit"
						type="submit"
						disabled={!currentCityInput}
						onClick={this.resetCityInput}>Search</button>
				</Link>
			</form>
		)
	}
}

WeatherForm.propTypes = {
	weatherFormPlaceholder: PropTypes.string.isRequired
}

WeatherForm.defaultProps = {
	weatherFormPlaceholder: 'Dickinson, Texas'
}