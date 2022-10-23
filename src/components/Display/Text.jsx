import React from 'react';

import Word from './Word';
import Element from 'components/Common/Element';
import ContextWrapper from 'components/Common/Context/ContextWrapper';

import ID from 'util/ID';
import { KEYS } from 'util/Keys.js';

import './styles/Text.css';

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
			letter: 0,
		},
	};

	constructor(props) {
		super(props);

		this.mainRef = React.createRef();
		this.firstBlockRef = React.createRef();
	}

	componentDidMount = () => {};

	componentDidUpdate = () => {};

	componentWillUnmount = () => {};

	static getDerivedStateFromProps(props, state) {
		return null;
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {}

	catchKeypress = (event) => {
		const { key, keyCode, target } = event;
		console.log(event.target);

		if (key === ' ') {
			event.preventDefault();

			let div = document.createElement('div');
			div.contentEditable = true;
			div.id = ID.generate();
			div.className = 'block';
			div.onkeydown = this.catchKeypress;

			this.mainRef.current.append(div);
			this.mainRef.current.childNodes.forEach((childNode, index) => {
				if (childNode.id === div.id) {
					this.setCaret(this.mainRef.current, index);
				}
			});
			return;
		} else if (key === 'Enter') {
		}
	};

	setCaret = (target, index) => {
		var range = document.createRange();
		var sel = window.getSelection();

		range.setStart(target.childNodes[index], 0);
		range.collapse(true);

		sel.removeAllRanges();
		sel.addRange(range);
	};

	render() {
		const { attributes, pointer, text } = this.state;
		const whitespaces = [
			KEYS.SPECIAL.getKey('Space').symbol,
			KEYS.SPECIAL.getKey('Tab').symbol,
		];

		const ContextList = ContextWrapper.ContextList;
		const Context = ContextWrapper.Context;

		return (
			<div id='textContainer' className='screen'>
				<ContextWrapper
					config={[
						ContextList('Font-Styles', [
							Context('button', 'Bold', 'bold'),
							Context('button', 'Italic', 'italic'),
							Context('button', 'Underline', 'underline'),
						]),

						ContextList('Font-Sizes', [
							Context('button', 'Preset: Tiny', 'tiny'),
							Context('button', 'Preset: Small', 'small'),
							Context('button', 'Preset: Neutral', 'neutral'),
							Context('button', 'Preset: Big', 'big'),
							Context('button', 'Preset: Huge', 'huge'),
						]),
					]}
					popModifier={this.popModifier}
				/>

				<div id='lines'>
					{text.map((line, i) => {
						return <p key={i}>{i + 1}</p>;
					})}
				</div>

				<div id='text' ref={this.mainRef}>
					<div
						contentEditable
						ref={this.firstBlockRef}
						id={ID.generate()}
						className='block'
						onKeyDown={this.catchKeypress}
					></div>
				</div>
			</div>
		);
	}
}

export default Text;
