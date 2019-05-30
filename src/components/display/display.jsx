import React, { Component } from 'react';

import Word from './Word';
import Toolbar from './Toolbar';

import './style/Display.css';

/**
 *
 */
class Display extends Component {
	state = {
		_promiseResolved: false,

		text: '',
		words: [],
		lines: 0,
		dirtyFlag: false,
		currentCard: null
	};

	componentDidMount = async () => {
		this.setState({
			currentCard: this.props.currentCard,
			_promiseResolved: true
		});
	};

	/**
	 *
	 */
	wordHandler = () => {};

	/**
	 *
	 */
	filter = text => {};

	/**
	 *
	 */
	package = element => {
		console.log(element);
		let text = element.innerHTML;
		console.log(text);

		text = text.replace(/<div><br><\/div>/gm, '<br>');
		text = text.replace(/<p><\/p>/gm, '');
		text = text.replace(/ /gm, '&nbsp;');
		console.log(text);

		let words = text.split(/&nbsp;|<br>|<p>.*<\/p>/).filter(el => {
			return el !== '';
		});
		words.forEach(word => {
			let pattern = new RegExp(word, 'gm');
			text = text.replace(pattern, word);
		});
		console.log(text);

		element.childNodes.forEach(child => {
			if (child.innerHTML !== '<br>') child.className = 'line';
		});

		this.setState({ lines: element.childNodes.length });

		//element.innerHTML = text;
	};

	writeLines = n => {
		let arr = [];
		for (let i = 0; i < n; i++) {
			arr.push(<p key={i}>{i}</p>);
		}
		return arr;
	};

	render() {
		if (!this.state._promiseResolved) return null;

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
						onInput={e => {
							//this.filter(e.target.innerHTML);
							//this.filter(e.target.textContent);
						}}
						onBlur={e => {
							console.log(e.target);
							this.package(e.target);
							console.log(e.target);
						}}
					/>
				</main>
			</div>
		);
	}
}

export default Display;
