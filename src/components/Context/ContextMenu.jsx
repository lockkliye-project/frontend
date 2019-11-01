import React, { Component } from 'react';

import Context from './Context';

import './style/ContextMenu.css';

class ContextMenu extends Component {
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
				style={{
					top: this.props.context.pos.y,
					left: this.props.context.pos.x
				}}
				onBlur={this.props.collapse}
			>
				{this.props.contextList.map(context => {
					return (
						<Context
							isLabel={context.isLabel}
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
