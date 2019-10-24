import React, { Component } from 'react';

import Navigator from './Navigator';
import ContextMenu from 'components/ContextMenu/ContextMenu';
import Display from 'components/Display/Display.jsx';

import test_entries from 'test_entries.json';

import './style/Application.css';

class Application extends Component {
	_isMounted = false;

	state = {
		context: {
			active: false,
			pos: {
				x: 0,
				y: 0
			},
			config: {}
		},

		data: {}
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

		document.addEventListener('contextmenu', e => {
			e.preventDefault();

			let context = this.state.context;
			context.pos = { x: e.pageX, y: e.pageY };
			context.active = true;
			this.setState({ context: context });
		});

		this.setState({ data: test_entries });
		this._isMounted = true;
	}

	/**
	 *
	 */
	dynamicImport = async modules => {
		/* Using experimental dynamic imports to parse needed modules from response-body */
		modules.split(',').forEach(async (m, i) => {
			let component = m.trim();
			let sharedData = this.state.sharedData;
			/* Dynamically import .jsx module from /modules/ folder */
			let module = await import(`./${component}/${component}.jsx`);
			/* Ensures the correct index of modules in array */
			sharedData.modules[i] = module.default;
			this.setState({ sharedData: sharedData });
		});
	};

	/**
	 *
	 */
	popCurrentCard = data => {
		this.setState({ currentCard: data });
	};

	/**
	 *
	 */
	collapse = () => {
		let context = this.state.context;
		context.active = false;
		this.setState({ context: context });
	};

	render() {
		if (!this._isMounted) return null;

		return (
			<div id='app'>
				{/* */}
				{this.state.context.active ? (
					<ContextMenu
						context={this.state.context}
						collapse={this.collapse}
					></ContextMenu>
				) : (
					''
				)}

				{/* */}
				<Navigator
					data={this.state.data}
					popCurrentCard={this.popCurrentCard}
				/>

				{/* */}
				<Display currentCard={this.state.currentCard} />
			</div>
		);
	}
}

export default Application;
