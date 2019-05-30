import React, { Component } from 'react';

import './style/Word.css';

class Word extends Component {
	state = {};

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

	render() {
		return (
			<p contentEditable className='word'>
				{this.props.content}
			</p>
		);
	}
}

export default Word;
