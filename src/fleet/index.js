import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './style.css';
import FleetForm from './containers/FleetForm';

class Home extends Component {
	render() {
		return (
			<div id="home">
				<Container>
					<h2 className="text-center">Fleet Centre</h2>
					<FleetForm />
				</Container>
			</div>
		);
	}
}

export default Home;
