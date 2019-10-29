/**
 *
 */
class Key {
	/**
	 *
	 *
	 * @param {String} symbol
	 */
	constructor(identifier, code, symbol) {
		this.identifier = identifier;
		this.code = code;
		this.symbol = symbol;
	}
}

/**
 *
 */
class Keys {
	/**
	 *
	 *
	 * @param {Array} keys
	 */
	constructor(...keys) {
		this.keys = keys.map(key => {
			return key;
		});
	}

	/**
	 *
	 * @param {*} index,
	 */
	getKey = index => {
		if (Number.isInteger(index)) {
			return this.keys.find(key => {
				return key.code === index;
			});
		}
		return this.keys.find(key => {
			return key.identifier === index;
		});
	};
}

/**
 *
 */
const KEYS = {
	/* */
	WHITELIST: [
		new Key('Numbers', NaN, '1234567890'),
		new Key('QWERTZ', NaN, 'abcdefghijklmnopqrstuvwxyz'),
		new Key('Umlauts', NaN, 'äöü'),
		new Key(
			'Special-Symbols',
			NaN,
			'ß´' +
			'^<,.-#+' + // QWERTZ
			'!"§$%&/()=?`' + // Shift-Numbers
			"°>;:_*'" + // Shift-Letters
			'{[]}\\`' + // ALT-Numbers
				'@|~€' // ALT-QWERTZ
		)
	],

	/* */
	SPECIAL: new Keys(
		new Key('Backspace', 8, '\b'),
		new Key('Tab', 9, '    '),
		new Key('Enter', 13, '\n'),
		new Key('Shift', 16, ''),
		new Key('Control', 17, ''),
		new Key('Alt', 18, ''),
		new Key('Capslock', 20, ''),
		new Key('Space', 32, ' '),
		new Key('Meta', 91, ''),
		new Key('fn', 255, '')
	),

	/* */
	NAVIGATION: new Keys(
		new Key('Left', 37, ''),
		new Key('Up', 38, ''),
		new Key('Right', 39, ''),
		new Key('Down', 40, '')
	),

	/* */
	SHORTCUT: new Keys(
		new Key('F1', 112, ''),
		new Key('F2', 113, ''),
		new Key('F3', 114, ''),
		new Key('F4', 115, ''),
		new Key('F5', 116, ''),
		new Key('F6', 117, ''),
		new Key('F7', 118, ''),
		new Key('F8', 119, ''),
		new Key('F9', 120, ''),
		new Key('F10', 121, '')
	)
};
