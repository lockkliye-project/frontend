const RGB_MIN = 0; // Minimum value for single 8-bit RGB colors
const RGB_MAX = 255; // Maximum value for single 8-bit RGB colors

/**
 * Color-coding operations for RGB-colors.
 * The RGB-colors are passed as an [R, G, B]-array.
 */
class RGB {
	/**
	 * Converts RGB [0-255] to HEX [00-FF].
	 *
	 * @param arr Array consisting of [r, g, b].
	 */
	static toHEX = (arr) => {
		let color = '#';
		arr.forEach((value) => {
			value = value.toString(16);
			/* */
			if (value.length === 1) value = '0' + value;
			/* Append the single or double digit value to the hex-string */
			color += value;
		});
		return color;
	};

	/**
	 * Interpolates RGB between a and b with t from [0, 1].
	 *
	 * @param {Array} a Array containing RGB-channels.
	 * @param {Array} b Array containing RGB-channels.
	 * @param {Number} t A number from [0-1]
	 */
	static interpolate = (a, b, t) => {
		let iter = 1 - t;
		return [iter * a[0] + t * b[0], iter * a[1] + t * b[1], iter * a[2] + t * b[2]];
	};

	/**
	 *
	 */
	static random = () => {
		return [
			Math.floor(Math.random() * RGB_MAX),
			Math.floor(Math.random() * RGB_MAX),
			Math.floor(Math.random() * RGB_MAX),
		];
	};
}

/**
 * Color-coding operations for HEX-colors.
 * Right now, only double digit HEX-numbers are supported and they are passed as a string,
 * without a '#'.
 */
class HEX {
	/**
	 * @param {*} color
	 */
	static isHex = (color) => {
		return Array.isArray(color);
	};

	/**
	 * Converts [00-FF] to RGB [0-255].
	 * For now can only break up six-digit HEX-colors.
	 *
	 * @param {String} color HEX value that is supposed to be converted to RGB.
	 */
	static toRGB = (color) => {
		let rgb = [];
		for (let i = 0, n = 3, col = color.replace('#', ''), multi = 2, bit = 16; i < n; i++) {
			rgb[i] = parseInt(col.substring(i * multi, i * multi + multi), bit);
		}
		return rgb;
	};

	/**
	 * Lightens the passed HEX-color.
	 *
	 * @param {String} color The HEX-color thats to be lightened
	 * @param {Number} factor Factor ranging from [0 - 1]
	 *
	 * @return {String} The new lightened HEX-color
	 */
	static lighten = (color, factor) => {
		let tempRGB = HEX.toRGB(color);
		for (let i = 0; i < 3; i++) {
			tempRGB[i] += Math.floor(RGB_MAX * factor);
			if (tempRGB[i] > RGB_MAX) tempRGB[i] = RGB_MAX;
		}
		return RGB.toHEX(tempRGB);
	};

	/**
	 * Darkens the passed HEX-color.
	 *
	 * @param {String} color The HEX-color thats to be darkened
	 * @param {Number} factor Factor ranging from [0 - 1]
	 *
	 * @return {String} The new darkened HEX-color
	 */
	static darken = (color, factor) => {
		let tempRGB = HEX.toRGB(color);
		for (let i = 0; i < 3; i++) {
			tempRGB[i] -= Math.floor(RGB_MAX * factor);
			if (tempRGB[i] < RGB_MIN) tempRGB[i] = RGB_MIN;
		}
		return RGB.toHEX(tempRGB);
	};

	/**
	 * Applies a semi-random noise to hex-color dependent on the
	 * passed noise-factor.
	 *
	 * @param {String} color Hex-color that noise is supposed to apply to.
	 * @param {Number} noiseFactor Factor with range [0-1].
	 *
	 * @return {String} The new noised hex-color.
	 */
	static randomNoise = (color, noiseFactor) => {
		let tempRGB = HEX.toRGB(color);
		for (let i = 0, n = tempRGB.length; i < n; i++) {
			let col = tempRGB[i];
			let noise = noiseFactor * (Math.random() * noiseFactor);
			col += Math.floor(noise) + noiseFactor; // Makes sure that color-fragment is integer
			if (col < RGB_MIN) {
				col = RGB_MIN;
			} else if (col > RGB_MAX) {
				col = RGB_MAX;
			}
			tempRGB[i] = col;
		}
		return RGB.toHEX(tempRGB);
	};

	/**
	 * Mixes an array of HEX-values to a single HEX-value.
	 *
	 * @param {Array} colors An array of HEX-values.
	 *
	 * @return {String} The mixed HEX-color.
	 */
	static mix = (colors) => {
		let arr = [0, 0, 0];
		colors.forEach((color) => {
			const tempRGB = HEX.toRGB(color);
			for (let i = 0, n = arr.length; i < n; i++) {
				arr[i] += tempRGB[i];
			}
		});
		for (let i = 0, n = arr.length; i < n; i++) {
			arr[i] = Math.floor(arr[i] / colors.length);
		}
		return RGB.toHEX(arr);
	};

	/**
	 *
	 */
	static random = () => {
		return RGB.toHEX(RGB.random());
	};
}

export { RGB, HEX };
