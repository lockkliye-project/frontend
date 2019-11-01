import React, { Component } from 'react';

import List from './List';
import Resizable from 'components/_common/Resizable';
import ContextWrapper from 'components/Context/ContextWrapper';

import './style/Navigator.css';

class Navigator extends Component {
	state = {
		_promiseResolved: false,
		treeDepth: 0,
		index: -1,
		lists: [],
		data: {}
	};

	componentDidMount = async () => {
		this.setState({ data: this.props.data, _promiseResolved: true }, () => {
			this.createSubList(this.props.data);
		});
	};

	/**
	 *
	 */
	createSubList = data => {
		let lists = this.state.lists;
		lists.push(
			<List
				key={Math.random() * 1000}
				data={data}
				popCurrentCard={this.props.popCurrentCard}
				createSubList={this.createSubList}
			/>
		);
		this.setState({ lists: lists });
	};

	render() {
		if (!this.state._promiseResolved) return null;

		return (
			<Resizable
				id='nav'
				className='screen'
				content={
					<React.Fragment>
						<ContextWrapper></ContextWrapper>

						{this.state.lists.map(list => {
							return list;
						})}
					</React.Fragment>
				}
			/>
		);
	}
}

export default Navigator;
