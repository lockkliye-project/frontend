import React, { Component } from 'react';

import './styles/Resizable.css';

class Resizable extends Component {
	state = {
		isDragged: false,
		collapsed: false,
	};

	componentDidMount = () => {
		document.onmousemove = (e) => {
			this.resize(e);
		};
		document.onmouseup = () => {
			this.stopResizing();
		};
	};

	componentDidUpdate = () => {};

	startResizing = () => {
		this.setState({ isDragged: true });
	};

	resize = (e) => {
		if (!this.state.isDragged) return;

		this.setState({ width: e.clientX });
	};

	stopResizing = () => {
		this.setState({ isDragged: false });
	};

	render() {
		return (
			<div
				id={this.props.id}
				className={
					this.props.className + ` resizable ${this.state.collapsed ? ' collapsed' : ''}`
				}
				style={{ width: this.state.width }}
			>
				<div
					className='dragger'
					onMouseDown={() => {
						this.startResizing();
					}}
				/>
				<div
					className='collapser'
					onMouseDown={() => {
						this.collapse();
					}}
				/>
				{this.props.content}
			</div>
		);
	}
}

export default Resizable;
