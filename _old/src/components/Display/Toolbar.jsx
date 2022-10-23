import React, { Component } from 'react';

import ContextWrapper from 'components/Context/ContextWrapper';

import './style/Toolbar.css';

class Toolbar extends Component {
	state = {
		mode: 0
	};

	/**
	 *
	 */
	popModifier = modifier => {};

	render() {
		const ContextList = ContextWrapper.ContextList;
		const Context = ContextWrapper.Context;

		return (
			<div id='toolbar'>
				<ContextWrapper
					config={[
						ContextList('Settings', [
							Context('button', 'Color', 'color'),
							Context('button', 'Size', 'size')
						])
					]}
					popModifier={this.popModifier}
				/>

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
