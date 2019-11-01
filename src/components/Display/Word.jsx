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

	componentDidMount = () => {
		let attributes = this.props.attributes;
	};

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
	pop = () => {};

	render() {
		return (
			<p
				className={`word ${this.props.whitespace ? 'whitespace' : ''}`}
				onClick={() => {
					this.props.popIndex(this.props.index);
				}}
				onContextMenu={() => {
					this.props.popContextIndex(this.props.index);
				}}
			>
				{this.props.content}
			</p>
		);
	}
}

export default Word;
