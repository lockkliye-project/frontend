import React, { Component } from 'react';

import Navigator from './navigator';
import Display from '../display/display';

import test_entries from '../../test_entries.json';

import './style/application.css';

class Application extends Component {
	state = {
		promiseResolved: false,
		data: {},
		currentCard: null
	};

	componentDidMount() {
		/*
		let eachRecursive = obj => {
			Object.keys(obj).forEach(key => {
				if (typeof obj[key] == 'object' && obj[key] !== null) {
					eachRecursive(obj[key]);
				} else {
					console.log('Value: ' + obj[key]);
				}
			});
		};
		eachRecursive(test_entries);
		*/

		this.setState({ data: test_entries }, () => {
			this.setState({ promiseResolved: true });
		});
	}

	pop() {
		return this.state.data;
	}

	render() {
		if (!this.state.promiseResolved) return null;

		return (
			<div id='app'>
				<Navigator data={this.state.data} />
				<Display currentCard={this.state.currentCard} />
			</div>
		);
	}
}

export default Application;
