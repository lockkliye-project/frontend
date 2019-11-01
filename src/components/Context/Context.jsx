import React, { Component } from 'react';

import './style/Context.css';

class Context extends Component {
	render() {
		return (
			<div
				className='context'
				onClick={() => {
					this.props.popModifier({
						index: this.props.index,
						modifier: this.props.option
					});
				}}
			>
				{this.props.option}
			</div>
		);
	}
}

export default Context;
