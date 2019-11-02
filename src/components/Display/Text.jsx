import React from 'react';

import Word from './Word';
import Element from 'components/_common/Element';
import ContextWrapper from 'components/Context/ContextWrapper';

import { KEYS } from 'util/keys.js';

import './style/Text.css';

/**
 *
 */
class Text extends Element {
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
			if (text.includes(' ')) {
				line++;
			}
			return [line - 1, letter];
		} catch (e) {
			return [0, 0];
		}
	};

	/**
	 *
	 */
	specialKeypress = index => {
		let pointer = this.state.pointer;
		let text = this.state.text;

		switch (index) {
			/* */
			case KEYS.SPECIAL.getKey('Space').code:
				this.setCaretIndex(
					pointer.line,
					pointer.word,
					pointer.letter + 1
				);
				text[pointer.line].push(KEYS.SPECIAL.getKey('Space').symbol);
				this.setState({ text: text });

				/*
				let word = text[pointer.line][pointer.word];
				word =
					word.substring(0, pointer.letter) +
					' ' +
					word.substring(pointer.letter, word.length);
				text[pointer.line][pointer.word] = word;

				this.setState({ text: text }, () => {
					this.setCaretIndex(
						pointer.line,
						pointer.word,
						pointer.letter + 1
					);
				});
				*/
				break;

			case KEYS.SPECIAL.getKey('Tab').code:
				this.setCaretIndex(
					pointer.line,
					pointer.word + 1,
					pointer.letter + 1
				);
				text[pointer.line].push(KEYS.SPECIAL.getKey('Tab').symbol);
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
				try {
					this.setCaretIndex(
						pointer.line - 1,
						pointer.word,
						pointer.letter
					);
				} catch (e) {
					this.setCaretIndex(
						pointer.line + 1,
						pointer.word,
						pointer.letter
					);
				}
				break;

			case KEYS.NAVIGATION.getKey('Right').code:
				try {
					this.setCaretIndex(
						pointer.line,
						pointer.word,
						pointer.letter + 1
					);
				} catch (e) {
					this.setCaretIndex(
						pointer.line,
						pointer.word,
						pointer.letter - 1
					);
				}
				break;

			case KEYS.NAVIGATION.getKey('Down').code:
				try {
					this.setCaretIndex(
						pointer.line + 1,
						pointer.word,
						pointer.letter
					);
				} catch (e) {
					this.setCaretIndex(
						pointer.line - 1,
						pointer.word,
						pointer.letter
					);
				}
				break;

			case KEYS.NAVIGATION.getKey('Left').code:
				try {
					this.setCaretIndex(
						pointer.line,
						pointer.word,
						pointer.letter - 1
					);
				} catch (e) {
					this.setCaretIndex(
						pointer.line,
						pointer.word,
						pointer.letter + 1
					);
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

	/**
	 *
	 */
	popModifier = modifier => {
		console.log(modifier);
	};

	render() {
		const { attributes, pointer, text } = this.state;
		const whitespaces = [
			KEYS.SPECIAL.getKey('Space').symbol,
			KEYS.SPECIAL.getKey('Tab').symbol
		];

		const ContextList = ContextWrapper.ContextList;
		const Context = ContextWrapper.Context;

		return (
			<div id='textContainer' className='screen'>
				<ContextWrapper
					config={[
						ContextList('Font-Styles', [
							Context('button', 'Bold', 'b'),
							Context('button', 'Italic', 'i'),
							Context('button', 'Underline', 'u')
						]),

						ContextList('Font-Sizes', [
							Context('button', 'Preset: Tiny', 'sTiny'),
							Context('button', 'Preset: Small', 'sSmall'),
							Context('button', 'Preset: Neutral', 'sNeutral'),
							Context('button', 'Preset: Big', 'sBig'),
							Context('button', 'Preset: Huge', 'sHuge')
						])
					]}
					popModifier={this.popModifier}
				/>

				<div id='lines'>
					{text.map((line, i) => {
						return <p key={i}>{i}</p>;
					})}
				</div>

				<div
					id='text'
					ref={this.ref}
					contentEditable
					onClick={() => {
						const indicies = this.getCaretIndex();
						this.setCaretIndex(
							indicies[0],
							pointer.word,
							indicies[1]
						);
					}}
					onKeyDown={e => {
						this.keypress(e);
					}}
				>
					{this.state.text.map((line, i) => {
						return (
							<div key={i} className='line'>
								{line.map((word, i) => {
									return (
										<Word
											key={i}
											index={i}
											whitespace={whitespaces.includes(
												word
											)}
											content={word}
											attributes={attributes}
											popIndex={index => {
												let pointer = this.state
													.pointer;
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
			</div>
		);
	}
}

export default Text;
