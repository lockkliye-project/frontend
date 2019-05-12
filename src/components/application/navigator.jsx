import React, { Component } from 'react';

import List from './list';
import Resizable from '../_common/resizable';

import './style/navigator.css';

class Navigator extends Component {
	state = {};

	render() {
		console.log(this.props.data);

		return (
			<Resizable
				id='nav'
				className='screen'
				startSize={500}
				content={
					<React.Fragment>
						<List id='list1' data={this.props.data} />
						<List id='list2' data={{}} />
					</React.Fragment>
				}
			/>
		);
	}
}

export default Navigator;
