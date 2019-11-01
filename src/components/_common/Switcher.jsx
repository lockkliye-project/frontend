import React, { Component } from 'react';

import './style/Switcher.css';

function Switch(props) {
	return (
		<div
			className={`switch ${props.selected ? ' selected' : ''}`}
			onClick={() => {
				props.popIndex(props.index);
			}}
		>
			{props.option}
		</div>
	);
}

class Switcher extends Component {
	state = {
		index: 0
	};

	popIndex = index => {
		this.setState({ index: index });
		this.props.popIndex(index);
	};

	render() {
		return (
			<div className='switcher'>
				<span className='label'>{this.props.label}</span>

				<div className='switches'>
					{this.props.options.map((option, i) => {
						return (
							<Switch
								key={i}
								index={i}
								option={option}
								selected={this.state.index === i}
								popIndex={this.popIndex}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Switcher;
