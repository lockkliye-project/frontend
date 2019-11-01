keypress = event => {
	event.preventDefault();

	const key = event.key;
	const keycode = event.keyCode;

	let pointer = this.state.pointer;

	// TODO: Temporary
	if (keycode === NAVIGATION.RIGHT) {
		pointer.column++;
		try {
			this.setCaretIndex(0, pointer.column);
		} catch (e) {
			pointer.column--;
		}
		this.setState({ pointer: pointer });
		return;
	} else if (keycode === NAVIGATION.LEFT) {
		pointer.column--;
		try {
			this.setCaretIndex(0, pointer.column);
		} catch (e) {
			pointer.column++;
		}
		this.setState({ pointer: pointer });
		return;
	}

	// TODO: Temporary
	if (keycode === 32) {
		let text = this.state.text;
		let word = text[0][0];
		word =
			word.substring(0, pointer.column) +
			' ' +
			word.substring(pointer.column, word.length);
		text[0][0] = word;

		this.setState({ text: text }, () => {
			pointer.column++;
			this.setCaretIndex(0, pointer.column);
			this.setState({ pointer: pointer });
		});
		return;
	}

	const whitelisted = (() => {
		let bool = false;
		for (const string of WHITELIST) {
			if (string.includes(key.toLowerCase())) {
				bool = true;
				break;
			}
		}
		return bool;
	})();
	if (!whitelisted) {
		error(key + ': ' + keycode);
		return;
	}
	success(key + ': ' + keycode);

	let text = this.state.text;
	let word = text[0][0];
	word =
		word.substring(0, pointer.column) +
		key +
		word.substring(pointer.column, word.length);
	text[0][0] = word;

	this.setState({ text: text }, () => {
		pointer.column++;
		this.setCaretIndex(0, pointer.column);
		this.setState({ pointer: pointer });
	});
};
