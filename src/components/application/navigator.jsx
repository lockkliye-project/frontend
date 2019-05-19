import React, { Component } from 'react';

import List from './list';
import Resizable from '../_common/resizable';

import './style/navigator.css';

const listStartSize = 250;

class Navigator extends Component {
	state = {
		data: {},
		subData: {}
	};

	updateSubdata = data => {
		console.log(data);
	};

	getList = data => {
		if (data === {}) return;
		return <List data={data} />;
	};

	render() {
		console.log(this.props.data);

		return (
			<Resizable
				id='nav'
				className='screen'
				startSize={listStartSize}
				content={
					<React.Fragment>
						<List data={this.props.data} updateSubdata={this.updateSubdata} />
						{this.getList(this.state.subData)}
					</React.Fragment>
				}
			/>
		);
	}
}

export default Navigator;
