/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */

class Array {
	/**
	 * @param {Array} array
	 * @param {Boolean} comparator
	 */
	static sort = (array, comparator) => {
		Array.sort(array, comparator);
	};

	/**
	 * Converts the elements of an array to a consecutive concatenated string.
	 *
	 * @param {Array} array, The array that is supposed to be converted.
	 * @param {String} seperator, A seperator to seperate the elements.
	 * @param {Number} from, The index where to begin with the stringification.
	 * @param {Number} to, The index where to end with the stringification.
	 * @param {Boolean} first, Apply the seperator at the beginning of the strings.
	 * @param {Boolean} false, Apply the seperator at the end of the string.
	 *
	 * @return {String} The concatenated string consisting of all array-elements.
	 */
	static toString = (
		array,
		seperator = '',
		from = 0,
		to = null,
		first = false,
		last = false
	) => {
		const end = to === null ? array.length : to;
		let string = first ? seperator : ''; // Prepends the seperator if first is true
		array.forEach((element, i) => {
			if (i < from || i > end) return;
			/* Only appends seperator if element is the second to last */
			string += element + (i < end ? seperator : '');
		});
		return string;
	};

	/**
	 * @param {Array} array, The array that is supposed to be converted.
	 * @param {*} seperator, A string seperator to seperate the elements.
	 */
	static fromString = (string, seperator = '', regex = '') => {
		return string.split(seperator);
	};

	/**
	 * Converts an object into an array by using the keys as elements
	 * and the order as the index.
	 *
	 * @param {Object} object The object that is supposed to be converted.
	 */
	static fromObject = object => {
		let array = [];
		Object.keys(object).forEach(key => {
			array.push(key);
		});
		return array;
	};

	/**
	 * @param {Array} array,
	 */
	static toObject = array => {
		let obj;
		array.forEach(element => {
			obj[element] = null;
		});
		return obj;
	};

	/**
	 * @param {Number} n,
	 * @param {Number} min,
	 * @param {Number} max,
	 * @param {Number} float,
	 */
	static random = (n = 100, min = 0, max = 100, float = false) => {
		let arr = [];
		for (let i = 0; i < n; i++) {
			let rand = Math.random() * max + min;
			arr[i] = float ? rand : Math.floor(rand);
		}
		return arr;
	};
}

export default Array;
