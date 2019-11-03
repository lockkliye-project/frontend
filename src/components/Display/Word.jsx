import React, { Component } from 'react';

import './style/Word.css';

class Word extends Component {
	state = {
		italic: false,
		bold: false,
		underlined: false,

		color: '#FFF',
		background: 'none',

		size: null,

		link: null
	};

	componentDidMount = () => {};

	/**
	 *
	 */
	word = string => {
		let flags = [];
		let flagString = '';
		flags.forEach(flag => {
			flagString += ' #' + flag;
		});

		let p = document.createElement('p');
		p.id = `flags ${flagString}`;
		p.className = 'word';
		p.innerHTML = string;
		return p;
	};

	/**
	 *
	 */
	popIndex = () => {
		this.props.popIndex(this.props.index);
	};

	render() {
		const whitespace = this.props.whitespace;

		let flag = '';
		if (!whitespace) {
			this.props.flag.split('_').forEach(string => {
				flag += `flag_${string} `;
			});
		}
		return (
			<p
				className={`word ${flag} ${whitespace ? 'whitespace' : ''}`}
				onClick={this.popIndex}
				onContextMenu={this.popIndex}
			>
				{this.props.content}
			</p>
		);
	}
}

export default Word;
