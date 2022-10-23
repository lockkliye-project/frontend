import React from 'react';

/* Components */
import Element from 'components/Common/Element';

/* Utility */
import ID from 'util/ID';

class App extends Component {
	state = {};

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
		return (
			<div id='app' className={this.state.scrolled ? 'scrolled' : ''}>
				<header id='app-header'></header>

				<main id='app-main' ref={this.mainRef} onClick={() => {}}>
					<div
						contentEditable
						ref={this.firstBlockRef}
						id={ID.generate()}
						className='block'
						onKeyDown={this.catchKeypress}
					></div>
				</main>
			</div>
		);
	}
}

export default App;
