/**
 * (C)reated by Burak Günaydin @ Fraunhofer IPK (2021)
 *
 * A port of my custom ID class from python to JavaScript for use of frontend internal identifiers
 * that don't get sent to the backend.
 */
import { uuid } from 'uuidv4';

class ID {
	static hex = (decimal) => {
		return Number(decimal).toString(16).padStart(2, '0');
	};

	/**
	 * Generates a 60-bit pseudo-random UUID with a custom algorithm that also takes the current timestamp into account,
	 * without exposing the MAC-address of the PC that the UUID is generated on (unlike the official UUID1 specification).
	 * Sucessfully tested collisions with 100.000.000 single threaded generated IDs in non-interrupted sequence and
	 * 10.000.000 multi threaded generated IDs.
	 */
	static generate = () => {
		let t = new Date();
		let datestamp = `${t.getDay()}${t.getMonth()}${t.getFullYear()}`;
		let timestamp = `${t.getMilliseconds()}${t.getSeconds()}${t.getMinutes()}${t.getHours()}`;
		let firstID = ID.hex(parseInt(timestamp)) + ID.hex(parseInt(datestamp)) + datestamp;
		let secondID = (uuid() + uuid()).replace(/-/gm, '');
		let finalID = (firstID + secondID).slice(0, 60);
		return finalID;
	};
}

export default ID;
