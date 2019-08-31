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

		caretIndex: [0, 0],
		text: [], //
		wordIndex: 0,
		words: [], //
		currentCard: null, //

		lines: 0 //
	};

	componentWillMount = async () => {
		this.setState({
			currentCard: this.props.currentCard,
			_promiseResolved: true
		});

		this._isMounted = true;
	};

	keypress = e => {
		this.getCaretIndex();

		console.log(e.key + ' ' + e.keyCode);
	};

	mouseclick = () => {
		this.getCaretIndex();
	};

	getCaretIndex = () => {
		let selection = document.getSelection();
		let text = selection.anchorNode.textContent.slice(0, selection.focusOffset);

		let line = text.split('\n').length;
		let column = text.split('\n').pop().length;
		this.setState({ index: [line, column] });
	};

	getWordIndex = () => {};

	writeLines = n => {
		let arr = [];
		for (let i = 0; i < n; i++) {
			arr.push(<p key={i}>{i}</p>);
		}
		return arr;
	};

	popIndex = index => {};

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
		this.setState({ lines: element.childNodes.length, words: words });
	};

	render() {
		if (!this._isMounted) return null;

		const text = this.state.text;

		console.log(text);
		console.log(this.state.index);

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
							this.package(e.target);
							//this.keypress(e);
						}}
						onClick={e => {
							this.mouseclick();
						}}
						onFocus={e => {}}
						onBlur={e => {}}
					>
						{/*this.state.text.map((word, i) => {
							return <Word index={i} content={word} popIndex={this.popIndex} />;
						})*/}
					</div>
				</main>
			</div>
		);
	}
}

export default Display;

/*
keypress = e => {
	this.getCaretIndex();

	e.preventDefault();
	e.stopPropagation();

	let text = this.state.text;
	let index = this.state.index[1];
	text = [text.slice(0, index), e.key, text.slice(index)].join('');

	this.setState({ text: text });

	console.log(e.key + ' ' + e.keyCode);
};

mouseclick = () => {
	this.getCaretIndex();
};

getCaretIndex = () => {
	let selection = document.getSelection();
	let text = selection.anchorNode.textContent.slice(0, selection.focusOffset);

	let line = text.split('\n').length;
	let column = text.split('\n').pop().length;
	this.setState({ index: [line, column] });
};
*/
