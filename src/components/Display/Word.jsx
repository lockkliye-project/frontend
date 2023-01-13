import React, { Component } from 'react';

import ID from 'util/ID';

import './styles/Word.css';

class Word extends Component {
	state = {
		content: '',
	};

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	componentDidMount = () => {};

	componentDidUpdate = () => {};

	render() {
		const { props } = this;

		return (
			<div
				contentEditable
				ref={this.ref}
				id={props.id}
				key={props.index}
				className={`word${props.whitespace ? ' whitespace' : ''}`}
				onKeyDown={(event) => {
					props.keypress(event);
				}}
			></div>
		);
	}
}

export default Word;
