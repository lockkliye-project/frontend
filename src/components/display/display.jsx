import React, { Component } from 'react';

import Toolbar from './Toolbar';
import Word from './Word';

import './style/Display.css';

const SPECIAL_KEYCODES = {
	8: '\b', // Backspace
	9: '	', // Tab
	13: '\n', // Enter
	32: ' ' // Space
};

const BLACKLIST = [];

/**
 *
 */
class Display extends Component {
	_isMounted = false;

	state = {
		dirty: false, //
		dirtyLines: [],

		caretIndex: [0, 0],

		matrix: [[]]
	};

	componentWillMount = async () => {
		this._isMounted = true;
	};

	/**
	 *
	 */
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
	package = element => {
		let matrix = this.state.matrix;
		element.childNodes.forEach((line, i) => {
			let arr = line.textContent.split(/(\S+)(\s+)/).map(el => {
				return el;
			});

			matrix[i] = arr;
		});
		this.setState({ lines: matrix.length, matrix: matrix });
	};

	render() {
		if (!this._isMounted) return null;

		let matrix = this.state.matrix;

		return (
			<div id='display' className='screen'>
				<Toolbar />
				<main>
					<div id='lines'>
						{matrix.map((el, i) => {
							return <p key={i}>{i}</p>;
						})}
					</div>

					<div
						id='text'
						contentEditable
						onKeyDown={e => {
							this.package(e.target);
						}}
					>
						{matrix.map(line => {
							return (
								<div className='line'>
									{line.map(el => {
										if (el.match('\\s+')) {
											return el;
										}
										return <Word content={el}></Word>;
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
