import React, { Component } from 'react';

import Word from './Word';
import Toolbar from './Toolbar';

import './style/Display.css';

const keycodes = {
	9: '    ', // Tab
	13: '\n', // Enter
	32: ' ' // Space
};

/**
 *
 */
class Display extends Component {
	_isMounted = false;

	state = {
		dirty: false, //

		text: '', //
		words: [], //
		currentCard: null, //

		lines: 0, //
		currentLine: 0
	};

	componentDidMount = async () => {
		this.setState({
			currentCard: this.props.currentCard,
			_promiseResolved: true
		});

		this._isMounted = true;
	};

	/**
	 *
	 *
	 * @param {Number} n,
	 */
	writeLines = n => {
		let arr = [];
		for (let i = 0; i < n; i++) {
			arr.push(<p key={i}>{i}</p>);
		}
		return arr;
	};

	/**
	 * @param {Event} e,
	 */
	keypress = e => {
		// Cancels the default keystroke-event
		//e.preventDefault();
		//e.stopPropagation();

		console.log(e.key + ' ' + e.keyCode);
	};

	render() {
		if (!this._isMounted) return null;

		return (
			<div id='display' className='screen'>
				<Toolbar />
				<main>
					<div id='lines'>
						{this.writeLines(this.state.lines).map(p => {
							return p;
						})}
					</div>

					<div
						id='text'
						contentEditable
						onKeyDown={e => {
							this.keypress(e);
						}}
						onInput={e => {}}
						onBlur={e => {
							//this.package(e.target);
						}}
					>
						{this.state.text}
					</div>
				</main>
			</div>
		);
	}
}

export default Display;

/*
package = element => {
	let text = element.innerHTML;

	console.log(text);
	let words = text.split(/\s+/).filter(el => {
		return el !== '';
	});
	console.log(words);
	for (let i = 0, n = words.length; i < n; i++) {
		words[i] = <Word content={words[i]} />;
	}
	console.log(words);

	element.childNodes.forEach(child => {
		if (child.innerHTML !== '<br>') child.className = 'line';
	});
	this.setState({ lines: element.childNodes.length });

	this.setState({ text: words });
};
*/

/*
package = element => {
	console.log(element);
	let text = element.innerHTML;
	console.log(text);

	text = text.replace(/<div><br><\/div>/gm, '<br>');
	text = text.replace(/<p><\/p>/gm, '');
	text = text.replace(/&nbsp;/gm, ' ');
	console.log(text);

	let words = text.split(/&nbsp;|<br>|<p>.*<\/p>/).filter(el => {
		return el !== '';
	});
	console.log(element.textContent);

	element.childNodes.forEach(child => {
		if (child.innerHTML !== '<br>') child.className = 'line';
	});
	this.setState({ lines: element.childNodes.length });

	element.innerHTML = text;
};
*/
