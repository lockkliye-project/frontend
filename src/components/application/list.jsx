import React, { Component } from 'react';

import './style/list.css';

class List extends Component {
	state = {};

	render() {
		return (
			<ul id={this.props.id} className='list'>
				{Object.keys(this.props.data).map(entry => {
					return (
						<li
							key={entry}
							className='nav'
							onClick={() => {
								this.props.updateSubdata(entry);
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
