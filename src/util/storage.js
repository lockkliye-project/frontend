/**
 * (C)reated by Burak Günaydin @ Fraunhofer IPK (2019)
 */
import CryptoJS from 'crypto-js';

/* */
const config = {
	mode: CryptoJS.mode.ECB
};

// TODO: Temporär, stattdessen API-key vom Server beim einloggen erhalten und in cookie speichern
const API_KEY = 'RnJhdW5ob2ZlcklQS1Zpc2lvblNlcnZpY2U=';
const HASHED_KEY = CryptoJS.AES.encrypt(API_KEY, API_KEY, config);

/**
 *
 * @param {*} value
 */
function hash(value) {
	const json = JSON.stringify(value);
	return CryptoJS.AES.encrypt(json, HASHED_KEY, config);
}

/**
 *
 * @param {*} value
 */
function unhash(value) {
	const string = value.toString();
	const bytes = CryptoJS.AES.decrypt(string, HASHED_KEY, config);
	const json = bytes.toString(CryptoJS.enc.Utf8);
	return JSON.parse(json);
}

/**
 * Helper functions written as class methods for easy, global access.
 * Can be used for various local- and localStorage-specific-operations.
 */
const Storage = {
	/**
	 *
	 * @param {*} key
	 * @param {*} value
	 */
	set: (key, value) => {
		localStorage.setItem(hash(key), hash(value));
	},

	/**
	 *
	 * @param {*} key
	 */
	get: key => {
		const hashedKey = hash(key);
		const json = localStorage.getItem(hashedKey);

		if (json === null) return null;

		return unhash(json);
	},

	/**
	 *
	 * @param {*} key
	 */
	clear: (key = null) => {
		if (key === null) {
			localStorage.clear();
			return;
		}
		localStorage.removeItem(hash(key));
	}
};

export default Storage;
