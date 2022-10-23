/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */
import { DEBUG } from 'config.js';

class Logger {
	constructor(className) {
		this.className = className;
	}

	/**
	 * Logging that only applies on debug-level.
	 * To see the logs in the console the flag 'DEBUG' hast to be set to 'true' in the
	 * 'config.js' file.
	 *
	 * @param {String} color,
	 * @param {String} msg,
	 * @param {*} data,
	 */
	logging(color, msg, data) {
		if (DEBUG) {
			let logColor = `color: ${color}`;

			const time = new Date();
			/* */
			console.log(
				`%c-- ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()} --`,
				'color: #AAA'
			);
			if (data === undefined) {
				if (msg instanceof Object || typeof msg === 'object' || Array.isArray(msg)) {
					console.log(`%c[${this.className}]`, logColor);
					console.log(msg);
				} else {
					console.log(`%c[${this.className}] ${msg} `, logColor);
				}
			} else {
				console.log(`%c[${this.className}] ${msg} `, logColor);
				console.log(data);
			}
		}
	}

	/**
	 *
	 */
	log(msg, data) {
		this.logging('#353535', msg, data);
	}

	/**
	 *
	 */
	info(msg, data) {
		this.logging('#55CCFF', msg, data);
	}

	/**
	 *
	 */
	success(msg, data) {
		this.logging('#11EE11', msg, data);
	}

	/**
	 *
	 */
	error(msg, data) {
		this.logging('#EE5544', msg, data);
	}
}

export default Logger;
