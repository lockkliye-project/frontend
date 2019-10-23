import React, { Component } from 'react';

import Context from './Context';

import './style/ContextMenu.css';

class ContextMenu extends Component {
	state = {};

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	componentDidMount = () => {
		this.ref.current.focus();
	};

	render() {
		return (
			<div
				id='contextMenu'
				className='container'
				tabIndex={0}
				ref={this.ref}
				style={{
					top: this.props.context.pos.y,
					left: this.props.context.pos.x
				}}
				onBlur={this.props.collapse}
			>
				<Context option='Placeholder1'></Context>
				<Context option='Placeholder2'></Context>
				<Context option='Placeholder3'></Context>
				<Context option='Placeholder4'></Context>
				<Context option='Placeholder5'></Context>
			</div>
		);
	}
}

export default ContextMenu;
