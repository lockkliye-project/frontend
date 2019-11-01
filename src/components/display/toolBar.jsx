import React, { Component } from 'react';

import ContextWrapper from 'components/Context/ContextWrapper';

import './style/Toolbar.css';

class Toolbar extends Component {
	state = {
		mode: 0
	};

	render() {
		return (
			<div id='toolbar'>
				<ContextWrapper></ContextWrapper>

				<div id='modes'>
					<div id='create' className='mode'>
						Create
					</div>

					<div id='edit' className='mode'>
						Edit
					</div>

					<div id='text' className='mode'>
						Text
					</div>
				</div>
			</div>
		);
	}
}

export default Toolbar;
