import React, { Component } from 'react';

import './style/Context.css';

class Context extends Component {
	state = {};

	componentDidMount = () => {};

	render() {
		return <div className='context'>{this.props.option}</div>;
	}
}

export default Context;
