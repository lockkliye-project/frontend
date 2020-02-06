/**
 * (C)reated by Burak Günaydin @ Fraunhofer IPK (2019)
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* Components */

/* Pages */

/* APIs */
import { decodeURL, encodeURL } from 'api/http';

/* Utility */
import { hitBreakpoint, NAVIGATION, path } from 'config.js';
import Array from 'util/Array.js';
import Storage from './util/Storage.js';

/* Styles */

const components = [];

/* The treshold (in pixel) when the locally scoped scroll-event is supposed to fire */
const scrollTreshold = 1;

/**
 * Main-Aplication component, which harbors the navigation, side-navigation and main-component.
 */
class App extends Element {
	_isMounted = false;

	state = {
		profileStatus: 'hidden',

		isLoggedIn: false,
		scrolled: false,
		sidebarCollapsed: false,

		sharedData: {},

		history: {
			nodes: [],
			origin: '',
			location: ''
		},

		indices: {
			navigation: null,
			subNavigation: null,
			sidebar: null
		}
	};

	componentDidMount = () => {
		/* Disables non-crucial console warnings */
		console.warn = warning => {};
		/* Disable critical console-logging to enable react error-handling */
		console.error = error => {};

		this.updateNodes();

		// TODO: Use below method for polyfill only, otherwise smarter solution, like device orientation
		const resize = () => {
			if (hitBreakpoint('mobile') || hitBreakpoint('tablet')) {
				this.collapseSidebar();
			}
		};
		window.addEventListener('resize', resize);
		resize();

		this.setState({ isLoggedIn: Storage.get('user') !== null });

		this._isMounted = true;
	};

	componentWillMount = async () => {
		let sharedData = this.state.sharedData;
		this.setState({
			sharedData: sharedData
		});
	};

	render() {
		if (!this._isMounted) return null;

		return (
			<div
				id='app'
				className={this.state.scrolled ? 'scrolled' : ''}
			></div>
		);
	}
}

export default App;
