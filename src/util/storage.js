import CryptoJS from 'crypto-js';

/* */
const ENCRYPTION_CONFIG = {
	mode: CryptoJS.mode.ECB,
};

// TODO: Temporär, stattdessen API-key vom Server beim einloggen erhalten und in cookie speichern
const API_KEY = 'lockkliye';
const HASHED_KEY = CryptoJS.AES.encrypt(API_KEY, API_KEY, ENCRYPTION_CONFIG);

/**
 * Helper functions written as class methods for easy, global access.
 * Can be used for various local- and localStorage-specific-operations.
 */
class Storage {
	static init() {
		Storage.memory = {};
	}

	/**
	 *
	 * @param {*} key
	 * @returns
	 */
	static getMemory(key = null) {
		try {
			return Storage.memory[key];
		} catch (e) {
			return null;
		}
	}

	/**
	 *
	 * @param {*} key
	 * @param {*} value
	 */
	static setMemory(key, value) {
		Storage.memory[key] = value;
	}

	/**
	 *
	 * @param {*} value
	 * @returns
	 */
	static hash = (value) => {
		const json = JSON.stringify(value);
		return CryptoJS.AES.encrypt(json, HASHED_KEY, ENCRYPTION_CONFIG);
	};

	/**
	 *
	 * @param {*} value
	 * @returns
	 */
	static unhash = (value) => {
		const string = value.toString();
		const bytes = CryptoJS.AES.decrypt(string, HASHED_KEY, ENCRYPTION_CONFIG);
		const json = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(json);
	};

	/**
	 *
	 * @param {*} key
	 * @param {*} value
	 * @param {*} temporary
	 * @param {*} encrypted
	 * @returns
	 */
	static set = (key, value, temporary = false, encrypted = false) => {
		if (encrypted) {
			const hashedKey = Storage.hash(key),
				hashedValue = Storage.hash(value);
			if (temporary) {
				sessionStorage.setItem(hashedKey, hashedValue);
				return;
			}
			localStorage.setItem(hashedKey, hashedValue);
		} else {
			if (temporary) {
				sessionStorage.setItem(key, JSON.stringify(value));
				return;
			}
			localStorage.setItem(key, JSON.stringify(value));
		}
	};

	/**
	 *
	 * @param {*} key
	 * @param {*} temporary
	 * @param {*} encrypted
	 * @returns
	 */
	static get = (key, temporary = false, encrypted = false) => {
		if (encrypted) {
			const hashedKey = Storage.hash(key);
			let json;
			if (temporary) {
				json = sessionStorage.getItem(hashedKey);
			} else {
				json = localStorage.getItem(hashedKey);
			}
			if (json === null) return null;
			return Storage.unhash(json);
		}
		let json;
		if (temporary) {
			json = sessionStorage.getItem(key);
		} else {
			json = localStorage.getItem(key);
		}
		if (json === null) return null;
		return JSON.parse(json);
	};

	/**
	 *
	 * @param {*} key
	 * @param {*} temporary
	 * @param {*} encrypted
	 * @returns
	 */
	static clear = (key = null, temporary = false, encrypted = false) => {
		if (temporary) {
			if (key === null) {
				sessionStorage.clear();
				return;
			}
			if (encrypted) {
				sessionStorage.removeItem(Storage.hash(key));
			} else {
				sessionStorage.removeItem(key);
			}
		} else {
			if (key === null) {
				localStorage.clear();
				return;
			}
			if (encrypted) {
				localStorage.removeItem(Storage.hash(key));
			} else {
				localStorage.removeItem(key);
			}
		}
	};
}

export default Storage;
