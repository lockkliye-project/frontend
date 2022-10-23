import React, { Component } from 'react';

import Context from './Context';

import './styles/ContextMenu.css';

class ContextMenu extends Component {
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
				tabIndex={0}
				ref={this.ref}
				style={{
					top: this.props.context.pos.y,
					left: this.props.context.pos.x,
				}}
				onBlur={this.props.collapse}
			>
				{this.props.config.map((contextList, listIndex) => {
					return contextList.map((context, index) => {
						return (
							<Context
								listIndex={listIndex}
								index={index}
								type={context.type}
								option={context.option}
								flag={context.flag}
								popModifier={this.props.popModifier}
							></Context>
						);
					});
				})}
			</div>
		);
	}
}

export default ContextMenu;
