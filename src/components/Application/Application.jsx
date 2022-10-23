import React, { Component } from 'react';

import Navigator from './Navigator';
import Display from 'components/Display/Display.jsx';
import Notifications from 'components/Notifications/Notifications.jsx';

import './styles/Application.css';

class Application extends Component {
	state = {};

	componentDidMount() {}

	/**
	 *
	 */
	collapse = () => {
		let context = this.state.context;
		context.active = false;
		this.setState({ context: context });
	};

	render() {
		const { data } = this.state;

		return (
			<div id='application'>
				<div id='lockScreen'></div>

				<Notifications />

				<Navigator />

				<Display />
			</div>
		);
	}
}

export default Application;
