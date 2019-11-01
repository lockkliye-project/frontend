import React, { Component } from 'react';

import Context from './Context';

import './style/ContextMenu.css';

class ContextMenu extends Component {
	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	componentDidMount = () => {
		this.ref.current.focus();
	};

	/**
	 *
	 */
	popModifier = modifier => {
		this.props.popModifier(modifier);
	};

	render() {
		return (
			<div
				id='contextMenu'
				tabIndex={0}
				ref={this.ref}
				style={{
					top: this.props.context.pos.y,
					left: this.props.context.pos.x
				}}
				onBlur={this.props.collapse}
			>
				{this.props.config.map(context => {
					return (
						<Context
							type={context.type}
							option={context.option}
							onClick={this.popModifier}
						></Context>
					);
				})}
			</div>
		);
	}
}

export default ContextMenu;
