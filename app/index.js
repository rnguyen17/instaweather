import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from 'components/header/header';
import Weather from 'components/weather/weather';
import Results from 'components/results/results';
import Home from 'components/home/home';

import 'index.css';

const App = (props) => {
	return (
		<BrowserRouter>
			<main id="main">
				<Header title="InstaWeather"/>
				<Route exact path="/" component={Home}/>
				<Route path="/results" component={Results} />
			</main>
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('app'));