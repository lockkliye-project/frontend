/**
 * (C)reated by Burak Günaydin (2019)
 */

/**
 *
 */
export const object = {
	/**
	 *
	 */
	toJSON: file => {},

	/**
	 *
	 */
	fromJSON: file => {},

	/**
	 *
	 */
	toXML: file => {},

	/**
	 *
	 */
	fromXML: file => {},

	/**
	 *
	 */
	copy: object => {
		let output, v, key;
		output = Array.isArray(object) ? [] : {};
		for (key in object) {
			v = object[key];
			output[key] = typeof v === 'object' ? this.copy(v) : v;
		}
		return output;
	}
};

/**
 *
 */
export const array = {
	/**
	 * Converts the elements of an array to a consecutive concatenated string.
	 *
	 * @param {Array} array, The array that is supposed to be converted.
	 * @param {String} seperator, A seperator to seperate the elements.
	 * @param {Number} from, The index where to begin with the stringification.
	 * @param {Number} to, The index where to end with the stringification.
	 * @param {Boolean} first, Apply the seperator at the beginning of the strings.
	 *
	 * @return {String} - The concatenated string consisting of all array-elements.
	 */
	toString: (array, seperator = '', from = 0, to = null, first = false) => {
		const end = to === null ? array.length : to;
		let string = first ? seperator : ''; // Prepends the seperator if first is true
		array.forEach((element, i) => {
			if (i < from || i > end) return;
			/* Only appends seperator if element is the second to last */
			string += element + (i < end ? seperator : '');
		});
		return string;
	},

	/**
	 * @param {Array} array, The array that is supposed to be converted.
	 * @param {*} seperator, A string seperator to seperate the elements.
	 */
	fromString: (string, seperator = '', regex = '') => {
		return string.split(seperator);
	},

	/**
	 * Converts an object into an array by using the keys as elements
	 * and the order as the index.
	 *
	 * @param {Object} object The object that is supposed to be converted.
	 */
	fromObject: object => {
		return Object.keys(object).map(key => {
			return key;
		});
	},

	/**
	 * @param {Array} array,
	 */
	toObject: array => {
		let obj;
		array.forEach(element => {
			obj[element] = null;
		});
		return obj;
	}
};

/**
 *
 */
export const json = {
	/**
	 *
	 */
	toXML: file => {},

	/**
	 *
	 */
	fromXML: file => {}
};

/**
 *
 */
export const xml = {
	/**
	 * A recursive algorithm to convert a XML-file to JSON.
	 *
	 * @param {XML} file The XML content that is supposed to be transformed.
	 * @return {JSON} The converted json.
	 */
	toJSON: file => {
		let temp = {};
		return temp;
	},

	/**
	 *
	 */
	fromJSON: file => {
		let temp = '';
		return temp;
	}
};
