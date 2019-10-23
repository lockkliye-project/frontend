import React, { Component } from 'react';

import Toolbar from './Toolbar';
import Word from './Word';

import './style/Display.css';

/* */
const SPECIAL_KEYCODES = {
	8: '\b', // Backspace
	9: '	', // Tab
	13: '\n', // Enter
	32: ' ' // Space
};

/* */
const NAVIGATION = {
	LEFT: 37, //
	UP: 38, //
	RIGHT: 39, //
	DOWN: 40 //
};

/* */
const WHITELIST = [
	'1234567890', //
	'abcdefghijklmnopqrstuvwxyz', //
	'äöü' //
];

/* */
const SHORTCUTS = {};

/**
 *
 */
class Display extends Component {
	_isMounted = false;

	state = {
		dirty: false, //

		attributes: [[]], //
		text: [['']] //
	};

	constructor(props) {
		super(props);

		this.textRef = React.createRef();
	}

	componentWillMount = async () => {
		this._isMounted = true;
	};

	/**
	 *
	 */
	setCaretIndex = (line = 0, column = 0) => {
		let element = this.ref.current;
		let range = document.createRange();
		let selection = window.getSelection();
		range.setStart(element.childNodes[line], column);
		range.setEnd(element.childNodes[line], column);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
		element.focus();
	};

	/**
	 *
	 */
	getCaretIndex = () => {
		try {
			let selection = document.getSelection();
			let text = selection.anchorNode.textContent.slice(
				0,
				selection.focusOffset
			);

			let line = text.split('\n').length;
			let column = text.split('\n').pop().length;
			return [line, column];
		} catch (e) {
			return [0, 0];
		}
	};

	/**
	 *
	 */
	package = event => {
		let element = event.target;
		let text = this.state.text;
		element.childNodes.forEach((line, i) => {
			let arr = line.textContent.split(/(\S+)(\s+)/).map(el => {
				return el;
			});
			text[i] = arr;
		});
		this.setState({ text: text });
	};

	render() {
		if (!this._isMounted) return null;

		const { attributes, text } = this.state;

		return (
			<div id='display' className='screen'>
				<Toolbar />
				<main>
					<div id='lines'>
						{text.map((line, i) => {
							return <p key={i}>{i}</p>;
						})}
					</div>

					<div id='text'>
						<div
							id='textDisplay'
							className='textContainer'
							ref={this.textRef}
							contentEditable
							onKeyDown={e => {
								this.package(e);
							}}
						>
							{text.map((line, i) => {
								return (
									<div key={i} className='line'>
										{line.map((word, i) => {
											if (word.match('\\s+')) {
												return word;
											}
											return (
												<Word
													key={i}
													index={i}
													content={word}
													attributes={attributes}
												></Word>
											);
										})}
									</div>
								);
							})}
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default Display;

/*
event.preventDefault();

const key = event.key;
const keycode = event.keyCode;

const navigation = false;
if (navigation) {
	return;
}

const whitelisted = (() => {
	let bool = false;
	for (const string of WHITELIST) {
		if (string.includes(key.toLowerCase())) {
			bool = true;
			break;
		}
	}
	return bool;
})();
if (!whitelisted) return;

let pointer = this.state.pointer;

let text = this.state.text;

let word = text[0][0];
word =
	word.substring(0, pointer.index) +
	key +
	word.substring(pointer.index, word.length);
text[0][0] = word;

this.setState({ text: text }, () => {
	pointer.index++;
	this.setCaretIndex(0, pointer.index);
	this.setState({ pointer: pointer });
});
*/
