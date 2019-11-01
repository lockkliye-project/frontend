import React, { Component } from 'react';

import ContextMenu from './ContextMenu';

import './style/ContextWrapper.css';

class ContextWrapper extends Component {
	state = {
		context: {
			active: false,
			pos: {
				x: 0,
				y: 0
			},
			modifier: {
				index: null,
				modifier: null
			},
			config: {}
		}
	};

	render() {
		return (
			<div
				className='contextWrapper'
				onContextMenu={event => {
					let context = this.state.context;
					context.pos = { x: event.pageX, y: event.pageY };
					context.active = true;
					this.setState({ context: context });
				}}
			>
				{this.state.context.active ? (
					<ContextMenu
						context={this.state.context}
						collapse={this.collapse}
						popModifier={this.popModifier}
					></ContextMenu>
				) : (
					''
				)}
			</div>
		);
	}
}

export default ContextWrapper;
