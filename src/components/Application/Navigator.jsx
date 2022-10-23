import React, { Component } from 'react';

import List from './List';
import Resizable from 'components/Common/Resizable';
import ContextWrapper from 'components/Context/ContextWrapper';

import './styles/Navigator.css';

class Navigator extends Component {
	state = {
		_promiseResolved: false,
		treeDepth: 0,
		index: -1,
		lists: [],
		data: {},
	};

	componentDidMount = async () => {
		this.setState({ data: this.props.data, _promiseResolved: true }, () => {
			this.createSubList(this.props.data);
		});
	};

	/**
	 *
	 */
	createSubList = (data) => {
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

	/**
	 *
	 */
	popModifier = (modifier) => {};

	render() {
		if (!this.state._promiseResolved) return null;

		const ContextList = ContextWrapper.ContextList;
		const Context = ContextWrapper.Context;

		return (
			<Resizable
				id='nav'
				className='screen'
				content={
					<React.Fragment>
						<ContextWrapper
							config={ContextList('Settings', [
								Context('button', 'Color', 'color'),
								Context('button', 'Size', 'size'),
								Context('button', 'Lock', 'lock'),
							])}
							popModifier={this.popModifier}
						/>

						{this.state.lists.map((list) => {
							return list;
						})}
					</React.Fragment>
				}
			/>
		);
	}
}

export default Navigator;
