import React from 'react';
import Weather from 'components/weather/weather';
import './home.css';

const Home = (props) => {
	return (
		<section className="section--home">
			<h1 className="title--display1">Curious About The Weather?</h1>
			<h4 className="title--display4">Enter any city and state (optional)</h4>
			<Weather />
		</section>
	)
}

export default Home;