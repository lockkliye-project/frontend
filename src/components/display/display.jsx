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

		//element.innerHTML = text;
	};

	render() {
		if (!this.state._promiseResolved) return null;

		return (
			<div id='display' className='screen'>
				<Toolbar />
				<main
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
				>
					{/*this.state.currentCard*/}
				</main>
			</div>
		);
	}
}

export default Display;
