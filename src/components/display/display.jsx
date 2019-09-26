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

		caretIndex: {
			line: 0,
			column: 0
		}, //

		attributes: [[]], //
		text: [[]] //
	};

	constructor() {
		super();

		this.ref = React.createRef();
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
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
		element.focus();
	};

	/**
	 *
	 */
	getCaretIndex = () => {
		let selection = document.getSelection();
		let text = selection.anchorNode.textContent.slice(
			0,
			selection.focusOffset
		);

		let line = text.split('\n').length;
		let column = text.split('\n').pop().length;
		return { line: line, column: column };
	};

	/**
	 *
	 */
	package = event => {
		/* */
		event.preventDefault();

		/* */
		const key = event.key;
		const keycode = event.keyCode;

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

		/* */
		const { line, column } = this.getCaretIndex();

		let text = this.state.text;
		text[0][column] = key;

		this.setState({ text: text }, () => {
			this.setCaretIndex(0, column + 1);
		});

		/*
		let element = event.target;
		let lines = this.state.lines;
		element.childNodes.forEach((line, i) => {
			let arr = line.textContent.split(/(\S+)(\s+)/).map(el => {
				return el;
			});
			lines[i] = arr;
		});
		this.setState({ lines: lines }, () => {
			this.setCaretIndex(0);
		});
		*/
	};

	render() {
		if (!this._isMounted) return null;

		let { attributes, text } = this.state;

		return (
			<div id='display' className='screen'>
				<Toolbar />
				<main>
					<div id='lines'>
						{text.map((line, i) => {
							return <p key={i}>{i}</p>;
						})}
					</div>

					<div
						id='text'
						ref={this.ref}
						contentEditable
						onKeyDown={e => {
							this.package(e);
						}}
					>
						{text.map((line, i) => {
							return (
								<div key={i} className='line'>
									{line.map((content, i) => {
										if (content.match('\\s+')) {
											return content;
										}
										return (
											<Word
												key={i}
												content={content}
												attributes={attributes}
											></Word>
										);
									})}
								</div>
							);
						})}
					</div>
				</main>
			</div>
		);
	}
}

export default Display;
