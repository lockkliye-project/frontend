import React from 'react';

import Toolbar from './Toolbar';
import Text from './Text';
import Element from 'components/Common/Element';

import './styles/Display.css';

class Display extends Element {
	state = {};

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
