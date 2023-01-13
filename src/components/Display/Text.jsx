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
		dirty: false,
		whitespaceSwitch: false,

		content: [],

		index: 0,
	};

	constructor(props) {
		super(props);

		this.mainRef = React.createRef();
		this.firstBlockRef = React.createRef();
	}

	componentDidMount = () => {
		this.setState({
			content: [<Word id={ID.generate()} index={0} keypress={this.catchKeypress} />],
		});
	};

	catchKeypress = (event) => {
		const { key, keyCode, target } = event;

		let { content, index, whitespaceSwitch } = this.state;

		if (whitespaceSwitch) {
			content.push(
				<Word id={ID.generate()} index={index + 1} keypress={this.catchKeypress}></Word>
			);

			this.setState({ content: content, index: index + 1, whitespaceSwitch: false }, () => {
				this.setCaret(this.mainRef.current, index + 1);
			});
			return;
		}

		if (key === ' ') {
			event.preventDefault();

			content.push(
				<Word
					id={ID.generate()}
					whitespace={true}
					index={index + 1}
					keypress={this.catchKeypress}
				></Word>
			);

			this.setState({ content: content, index: index + 1, whitespaceSwitch: true }, () => {
				this.setCaret(this.mainRef.current, index + 1);
			});
			return;
		} else if (key === 'Enter') {
		} else if (key === 'Backspace') {
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
		const { content } = this.state;

		return (
			<div id='textContainer' className='screen'>
				<div id='lines'>
					{content.map((line, i) => {
						return <p key={i}>{i + 1}</p>;
					})}
				</div>

				<div
					id='text'
					ref={this.mainRef}
					onClick={(event) => {
						this.mainRef.current.focus();
					}}
				>
					{content.map((word) => {
						return word;
					})}
				</div>
			</div>
		);
	}
}

export default Text;
