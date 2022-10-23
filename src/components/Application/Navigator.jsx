import React, { Component } from 'react';

import List from './List';
import Resizable from 'components/Common/Resizable';

import './styles/Navigator.css';

class Navigator extends Component {
	state = {
		treeDepth: 0,
		index: -1,

		data: [
			{
				meta: {
					identifier: '',
					name: 'Testfolder 1',
					description: '',
					author: 'Test User 1',
					type: 'folder',
					amountOfSubfolders: 1,
					amountOfFiles: 0,
				},
			},
			{
				meta: {
					identifier: '',
					name: 'Testfile 1',
					description: '',
					author: 'Test User 1',
					type: 'file',
				},
			},
		],

		lists: [],
	};

	componentDidMount = async () => {
		const { data } = this.state;
		this.setState({ data: data }, () => {
			this.createSubList(data);
		});
	};

	/**
	 *
	 */
	createSubList = (data) => {
		let { lists } = this.state;
		lists.push(
			<List
				data={data}
				popCurrentCard={this.props.popCurrentCard}
				createSubList={this.createSubList}
			/>
		);
		this.setState({ lists: lists });
	};

	render() {
		const { data, lists } = this.state;

		return (
			<Resizable
				id='nav'
				className='screen'
				content={
					<React.Fragment>
						{lists.map((list) => {
							return list;
						})}
					</React.Fragment>
				}
			/>
		);
	}
}

export default Navigator;

/*
[
	{
		meta: {
			identifier: '',
			name: 'Testfolder 1',
			description: '',
			author: 'Test User 1',
			type: 'folder',
			amountOfSubfolders: 1,
			amountOfFiles: 0,
		},
		subfolders: [
			{
				meta: {
					identifier: '',
					type: 'folder',
					name: 'Testfolder 1.1',
					description: '',
					author: 'Test User 1',
					amountOfSubfolders: 0,
					amountOfFiles: 0,
				},
				subfolders: [],
				files: [],
			},
		],
		files: [],
	},
	{
		meta: {
			identifier: '',
			name: 'Testfile 1',
			description: '',
			author: 'Test User 1',
			type: 'file',
			version: 1,
		},
		content: '',
	},
]
*/

/*
folder: {
meta: {
	identifier: string,
	type: 'folder',
	name: string,
	description: string,
	author: string,
	amountOfSubfolders: integer,
	amountOfFiles: integer,
},
subfolders: array of folders,
files: array of files
}
*/

/*
file: {
meta: {
	identifier: string,
	type: 'file',
	subtype: one of ['note', 'binary', 'archive', 'image', 'audio', 'video', 'list', 'diagram'],
	name: string,
	description: string,
	author: string,
	version: integer
},
content: ''
}
*/
