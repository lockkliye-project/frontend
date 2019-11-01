import React, { Component } from 'react';

import Navigator from './Navigator';
import Display from 'components/Display/Display.jsx';

import test_entries from 'test_entries.json';

import './style/Application.css';
import ContextWrapper from '../Context/ContextWrapper';

class Application extends Component {
	_isMounted = false;

	state = {
		data: {}
	};

	componentDidMount() {
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
	collapse = () => {
		let context = this.state.context;
		context.active = false;
		this.setState({ context: context });
	};

	render() {
		if (!this._isMounted) return null;

		return (
			<div id='app'>
				{/* <Notifications/> */}

				{/* */}
				<Navigator data={this.state.data} />

				{/* */}
				<Display />
			</div>
		);
	}
}

export default Application;
