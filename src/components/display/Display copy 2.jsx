import React, { Component } from 'react';

import Word from './Word';
import Toolbar from './Toolbar';

import './style/Display.css';

const SPECIAL_KEYCODES = {
	8: '\b', // Backspace
	9: '	', // Tab
	13: '\n', // Enter
	32: ' ' // Space
};

const WHITELIST = [];

const BLACKLIST = [
	'Shift',
	'Control',
	'Meta',
	'Alt',
	'Dead',
	'Escape',
	'CapsLock',
	'Escape'
];

/**
 *
 */
class Display extends Component {
	constructor() {
		super();

		this.lineRef = React.createRef();
		this.textRef = React.createRef();
	}

	state = {
		editMode: false,
		dirty: false, //

		caretIndex: [0, 0], //
		matrix: [[], []], //

		lineCount: 1, //
		wordCount: 0 //
	};

	setCaretIndex = (line = 0, column = 0) => {
		let element = this.textRef.current;
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
		let text = selection.anchorNode.textContent.slice(0, selection.focusOffset);

		let line = text.split('\n').length;
		let column = text.split('\n').pop().length;
		return { line: line, column: column };
	};

	/**
	 *
	 */
	keyPress = e => {
		/* */
		e.preventDefault();
		e.stopPropagation();

		const index = this.getCaretIndex();
		console.log(index);

		let matrix = this.state.matrix;

		/* */
		if (SPECIAL_KEYCODES[e.keyCode]) {
			matrix[index.line][index.column] = SPECIAL_KEYCODES[e.keyCode];
			console.log(matrix[index.line][index.column]);
			return;
		} else if (
			BLACKLIST.find(k => {
				return k === e.key;
			})
		) {
			console.log('Blacklisted: ', e.key, e.keyCode);
			return;
		} else if (e.key === 'ArrowLeft') {
			this.setCaretIndex(index.line, index.column - 1);
			return;
		} else if (e.key === 'ArrowRight') {
			this.setCaretIndex(index.line, index.column + 1);
			return;
		}

		console.log(e.key, e.keyCode);
		matrix[index.line][index.column] = <Word content={e.key} />;
		this.setState({ matrix: matrix }, () => {
			this.setCaretIndex(index.line, index.column + 1);
		});
	};

	/**
	 *
	 */
	mouseClick = e => {};

	/**
	 *
	 */
	pushData = async () => {};

	render() {
		console.log(this.state.matrix);

		return (
			<div id='display' className='screen'>
				<Toolbar />

				<main>
					<div id='lines' ref={this.lineRef}></div>

					<div
						id='text'
						contentEditable
						onKeyDown={this.keyPress}
						onClick={this.mouseClick}
						ref={this.textRef}
					>
						{this.state.matrix.map(line => {
							return (
								<div className='line'>
									{line.map(word => {
										return word;
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
