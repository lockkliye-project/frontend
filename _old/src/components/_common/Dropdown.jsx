import React, { Component } from 'react';

import SVGWrapper from 'components/_common/SVGWrapper';

import { path } from 'config.js';

import './style/Dropdown.css';

class Dropdown extends Component {
	state = {
		index: 0,

		collapsed: true
	};

	popIndex = index => {
		this.collapse();
		this.setState({ index: index });
		this.props.popIndex(index);
	};

	collapse = () => {
		this.setState({ collapsed: !this.state.collapsed });
	};

	render() {
		const options = this.props.options;

		return (
			<div className={`dropdown ${this.props.className}`}>
				<span className='label'>{this.props.label}</span>

				<div className='optionsContainer'>
					<div
						className='optionsLabel'
						onClick={() => {
							this.collapse();
						}}
					>
						{options[this.state.index]}
					</div>

					<div className='arrow'>
						<SVGWrapper src={path('icon')} icon='arrow' />
					</div>

					<div className={`options ${this.state.collapsed ? 'collapsed' : ''}`}>
						{options.map((option, i) => {
							return (
								<div
									key={i}
									className='option'
									onClick={() => {
										this.popIndex(i);
									}}
								>
									{option}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Dropdown;
