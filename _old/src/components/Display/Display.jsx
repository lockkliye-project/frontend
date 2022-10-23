import React from 'react';

import Toolbar from './Toolbar';
import Text from './Text';
import Element from 'components/_common/Element';

import './style/Display.css';

/**
 *
 */
class Display extends Element {
	state = {};

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	render() {
		return (
			<div id='display' className='screen'>
				<Toolbar />

				<Text />
			</div>
		);
	}
}

export default Display;
