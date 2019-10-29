import React from 'react';

import Toolbar from './Toolbar';
import Word from './Word';

import Element from 'components/_common/Element';

import { error, log, success } from 'util/logging.js';

import './style/Display.css';

/**
 *
 */
class Key {
	/**
	 *
	 *
	 * @param {String} symbol
	 */
	constructor(identifier, code, symbol) {
		this.identifier = identifier;
		this.code = code;
		this.symbol = symbol;
	}
}

/**
 *
 */
class Keys {
	/**
	 *
	 *
	 * @param {Array} keys
	 */
	constructor(...keys) {
		this.keys = keys.map(key => {
			return key;
		});
	}

	/**
	 *
	 * @param {*} index,
	 */
	getKey = index => {
		if (Number.isInteger(index)) {
			return this.keys.find(key => {
				return key.code === index;
			});
		}
		return this.keys.find(key => {
			return key.identifier === index;
		});
	};
}

/**
 *
 */
const KEYS = {
	/* */
	WHITELIST: [
		new Key('Numbers', NaN, '1234567890'),
		new Key('QWERTZ', NaN, 'abcdefghijklmnopqrstuvwxyz'),
		new Key('Umlauts', NaN, 'äöü'),
		new Key(
			'Special-Symbols',
			NaN,
			'ß´' +
			'^<,.-#+' + // QWERTZ
			'!"§$%&/()=?`' + // Shift-Numbers
			"°>;:_*'" + // Shift-Letters
			'{[]}\\`' + // ALT-Numbers
				'@|~€' // ALT-QWERTZ
		)
	],

	/* */
	SPECIAL: new Keys(
		new Key('Backspace', 8, '\b'),
		new Key('Tab', 9, '    '),
		new Key('Enter', 13, '\n'),
		new Key('Shift', 16, ''),
		new Key('Control', 17, ''),
		new Key('Alt', 18, ''),
		new Key('Capslock', 20, ''),
		new Key('Space', 32, ' '),
		new Key('Meta', 91, ''),
		new Key('fn', 255, '')
	),

	/* */
	NAVIGATION: new Keys(
		new Key('Left', 37, ''),
		new Key('Up', 38, ''),
		new Key('Right', 39, ''),
		new Key('Down', 40, '')
	),

	/* */
	SHORTCUT: new Keys(
		new Key('F1', 112, ''),
		new Key('F2', 113, ''),
		new Key('F3', 114, ''),
		new Key('F4', 115, ''),
		new Key('F5', 116, ''),
		new Key('F6', 117, ''),
		new Key('F7', 118, ''),
		new Key('F8', 119, ''),
		new Key('F9', 120, ''),
		new Key('F10', 121, '')
	)
};

/**
 *
 */
class Display extends Element {
	state = {
		dirty: false, //

		attributes: [['']], //
		text: [['']], //

		pointer: {
			line: 0,
			word: 0,
			letter: 0
		}
	};

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	/**
	 *
	 */
	copy = object => {
		let output, v, key;
		output = Array.isArray(object) ? [] : {};
		for (key in object) {
			v = object[key];
			output[key] = typeof v === 'object' ? this.copy(v) : v;
		}
		return output;
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
		this.setState({ text: text }, () => {
			event.target.textContent = '';
		});
	};

	/**
	 *
	 */
	setCaretIndex = (line, word, letter) => {
		try {
			let element = this.ref.current.childNodes[line].childNodes[word];
			let range = document.createRange();
			let selection = window.getSelection();
			range.setStart(element.childNodes[line], letter);
			range.setEnd(element.childNodes[line], letter);
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);
			element.focus();
			this.setState({
				pointer: { line: line, word: word, letter: letter }
			});
		} catch (e) {
			return e;
		}
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
			let letter = text.split('\n').pop().length;
			return [line, letter];
		} catch (e) {
			return [0, 0];
		}
	};

	/**
	 *
	 */
	specialKeypress = index => {
		let pointer = this.state.pointer;

		switch (index) {
			/* */
			case KEYS.SPECIAL.getKey('Space').code:
				this.setCaretIndex(
					pointer.line,
					pointer.word + 1,
					pointer.letter + 1
				);
				let text = this.state.text;
				text[pointer.line].push('Test');
				this.setState({ text: text });
				break;

			case KEYS.SPECIAL.getKey('Enter').code:
				this.setCaretIndex(
					pointer.line + 1,
					pointer.word,
					pointer.letter
				);
				break;

			/* */
			case KEYS.NAVIGATION.getKey('Up').code:
				break;

			case KEYS.NAVIGATION.getKey('Right').code:
				try {
					this.setCaretIndex(pointer.line, 0, pointer.letter + 1);
				} catch (e) {
					this.setCaretIndex(pointer.line, 0, pointer.letter - 1);
				}
				break;

			case KEYS.NAVIGATION.getKey('Down').code:
				break;

			case KEYS.NAVIGATION.getKey('Left').code:
				try {
					this.setCaretIndex(pointer.line, 0, pointer.letter - 1);
				} catch (e) {
					this.setCaretIndex(pointer.line, 0, pointer.letter + 1);
				}
				break;

			/* */
			case KEYS.SHORTCUT.getKey('F5').code:
				window.location.reload();
				break;

			default:
				break;
		}
	};

	/**
	 *
	 */
	keypress = event => {
		event.preventDefault();

		const key = event.key;
		const keycode = event.keyCode;

		/* */
		if (
			!(() => {
				let bool = false;
				KEYS.WHITELIST.forEach(whitelistedKey => {
					if (whitelistedKey.symbol.includes(key.toLowerCase())) {
						bool = true;
					}
				});
				return bool;
			})()
		) {
			this.specialKeypress(keycode);
			return;
		}

		let pointer = this.state.pointer;
		let text = this.state.text;
		let word = text[pointer.line][pointer.word];
		word =
			word.substring(0, pointer.letter) +
			key +
			word.substring(pointer.letter, word.length);
		text[pointer.line][pointer.word] = word;

		this.setState({ text: text }, () => {
			this.setCaretIndex(pointer.line, pointer.word, pointer.letter + 1);
		});
	};

	render() {
		const { attributes, pointer, text } = this.state;

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
						className=''
						ref={this.ref}
						contentEditable
						onClick={() => {
							this.setCaretIndex(
								this.getCaretIndex()[0],
								pointer.word,
								this.getCaretIndex()[1]
							);
							console.log(pointer);
						}}
						onKeyDown={e => {
							this.keypress(e);
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
												popIndex={index => {
													pointer.word = index;
													this.setState({
														pointer: pointer
													});
												}}
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
