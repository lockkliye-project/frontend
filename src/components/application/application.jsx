import React, { Component } from 'react';

import Navigator from './Navigator';
import Display from '../Display/Display';

import test_entries from '../../test_entries.json';

import './style/Application.css';

class Application extends Component {
	state = {
		_promiseResolved: false,
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

		this.setState({ data: test_entries, _promiseResolved: true });
	}

	popCurrentCard = data => {
		this.setState({ currentCard: data });
	};

	render() {
		if (!this.state._promiseResolved) return null;

		return (
			<div id='app'>
				<Navigator
					data={this.state.data}
					popCurrentCard={this.popCurrentCard}
				/>
				<Display currentCard={this.state.currentCard} />
			</div>
		);
	}
}

export default Application;
