/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */

class Number {
	/**
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Boolean} float
	 */
	static random = (min, max, float = false) => {
		let r = min + (max - min) * Math.random();
		return float ? r : Math.floor(r);
	};

	/**
	 * A function to interpolate between a and b with t from [0, 1]
	 *
	 * @param {Number} a
	 * @param {Number} b
	 * @param {Number} t
	 */
	static interpolate = (a, b, t) => {
		return (1 - t) * a + t * b;
	};
}

export default Number;
