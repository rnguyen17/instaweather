import React from 'react';
import Weather from 'components/weather/weather';
import './home.css';

const Home = (props) => {
	return (
		<section className="section-home">
			<h2>Enter a City and State</h2>
			<Weather />
		</section>
	)
}

export default Home;