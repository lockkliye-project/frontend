import React, { Component } from 'react';

import Word from './Word';
import Toolbar from './Toolbar';

import './style/Display.css';

const keycodes = {
	8: '\b', // Backspace
	9: '\t', // Tab
	13: '\n', // Enter
	32: ' ' // Space
};

const blacklist = [
	'Shift',
	'Control',
	'Meta',
	'Alt',
	'Dead',
	'Escape',
	'CapsLock',
	'ArrowUp',
	'ArrowLeft',
	'ArrowRight',
	'ArrowDown'
];

/**
 *
 */
class Display extends Component {
	_isMounted = false;

	state = {
		editMode: false,
		dirty: false, //

		index: [0, 0],
		text: [], //
		words: [], //
		currentCard: null, //

		lines: 0 //
	};

	componentDidMount = async () => {
		console.error = () => {};

		this.setState({
			currentCard: this.props.currentCard,
			_promiseResolved: true
		});

		this._isMounted = true;
	};

	keypress = e => {
		this.getCaretIndex();

		let contains = false;
		blacklist.forEach(el => {
			if (el === e.key) contains = true;
		});
		if (contains) return;

		let key = keycodes[e.keyCode] !== undefined ? keycodes[e.keyCode] : e.key;

		let text = this.state.text;
		let index = this.state.index[1];
		text = [text.slice(0, index), key, text.slice(index)].join('');

		let el = e.target;
		let range = document.createRange();
		let sel = window.getSelection();

		this.setState({ text: text });
	};

	mouseclick = e => {
		this.getCaretIndex();
	};

	getCaretIndex = () => {
		let selection = document.getSelection();
		let text = selection.anchorNode.textContent.slice(0, selection.focusOffset);

		let line = text.split('\n').length;
		let column = text.split('\n').pop().length;
		this.setState({ index: [line, column] });
	};

	writeLines = n => {
		let arr = [];
		for (let i = 0; i < n; i++) {
			arr.push(<p key={i}>{i}</p>);
		}
		return arr;
	};

	populate = () => {
		if (this.state.text.length <= 0) {
			return [<Word id='placeholder' content=' ' />];
		}
		return this.state.text;
	};

	render() {
		if (!this._isMounted) return null;

		console.log(this.state.index);
		console.log(this.state.text);

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
						onClick={e => {
							this.mouseclick(e);
							this.setState({ editMode: true });
						}}
						onBlur={e => {
							this.setState({ editMode: false });
						}}
					>
						{this.state.editMode
							? (this.innerHTML = this.innerHTML)
							: (this.innerHTML = this.state.text)}
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
