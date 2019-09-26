import { DEBUG } from 'config.js';

/**
 *
 * @param {*} msg
 */
export function log(msg, timestamp = false) {
	if (DEBUG) {
		const time = new Date();
		if (!timestamp) {
			console.log(msg);
			return;
		}
		console.log(
			`@${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}: ${JSON.stringify(
				msg
			)}`
		);
	}
}
