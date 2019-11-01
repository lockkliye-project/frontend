/**
 * (C)reated by Burak Günaydin (2019)
 */
import { DEBUG } from 'config.js';

/**
 * Logging that only applies on debug-level.
 * To see the logs in the console the flag 'DEBUG' hast to be set to 'true' in the
 * 'config.js' file.
 *
 * @param {*} msg,
 * @param {String} color,
 */
function logging(msg, color) {
	if (DEBUG) {
		let logColor = `color: ${color}`;

		const time = new Date();
		/* */
		console.log(
			`%c-- ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()} --`,
			'color: #AAA'
		);
		if (msg instanceof Object || typeof msg === 'object') {
			console.log(msg);
		} else {
			console.log(`%c${msg} `, logColor);
		}
	}
}

/**
 *
 * @param {*} msg
 */
export function log(msg) {
	logging(msg, '#AAAAAA');
}

/**
 *
 * @param {*} msg
 */
export function info(msg) {
	logging(msg, '#55CCFF');
}

/**
 *
 * @param {*} msg
 */
export function success(msg) {
	logging(msg, '#11EE11');
}

/**
 *
 * @param {*} msg
 */
export function error(msg) {
	logging(msg, '#FF6655');
}
