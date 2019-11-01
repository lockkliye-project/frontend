import React, { Component } from 'react';

import ContextMenu from './ContextMenu';

class ContextWrapper extends Component {
	state = {
		context: {
			index: null,
			active: false,
			pos: {
				x: 0,
				y: 0
			},
			config: {}
		}
	};

	componentWillMount = () => {
		/*
		document.addEventListener('contextmenu', event => {
			event.preventDefault();

			let context = this.state.context;
			context.pos = { x: event.pageX, y: event.pageY };
			context.active = true;
			this.setState({ context: context });
		});
		*/
	};

	render() {
		return (
			<React.Fragment>
				{this.state.context.active ? (
					<ContextMenu
						context={this.state.context}
						collapse={this.collapse}
						popModifier={this.popModifier}
					></ContextMenu>
				) : (
					''
				)}
			</React.Fragment>
		);
	}
}

export default ContextWrapper;
