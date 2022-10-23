/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */
import React from 'react';

/* Components */
import Element from 'components/_common/Element';

/* Pages */

/* APIs */

/* Utility */

/* Styles */

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
			location: '',
		},

		indices: {
			navigation: null,
			subNavigation: null,
			sidebar: null,
		},
	};

	componentDidMount = () => {
		this._isMounted = true;
	};

	render() {
		if (!this._isMounted) return null;

		return <div id='app' className={this.state.scrolled ? 'scrolled' : ''}></div>;
	}
}

export default App;
