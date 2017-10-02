import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Weather from 'components/weather/weather';
import './header.css';

const Header = (props) => {
	return (
		<header className="header">
			<Link to="/" className="logo">
				<h3>{props.title}</h3>
			</Link>
			<nav>
				<Weather />
			</nav>
		</header>
	)
}

Header.propTypes = {
	title: PropTypes.string.isRequired
}

Header.defaultProps = {
	title: 'iWeather'
}

export default Header;