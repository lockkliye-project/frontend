import React, { Component } from 'react';

import './style/List.css';

class List extends Component {
	state = {};

	render() {
		const data = this.props.data;

		return (
			<ul id={this.props.id} className='list'>
				{Object.keys(data).map(entry => {
					return (
						<li
							key={entry}
							className='nav'
							onClick={() => {
								const entryData = data[entry];
								typeof entryData === 'string' || entryData instanceof String
									? this.props.popCurrentCard(entryData)
									: this.props.createSubList(entryData);
							}}
						>
							{entry}
						</li>
					);
				})}
			</ul>
		);
	}
}

export default List;
