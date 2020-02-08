/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */
import CryptoJS from 'crypto-js';

class Storage {
	static CONFIG = {
		mode: CryptoJS.mode.ECB
	};

	// TODO: Temporär, stattdessen API-key vom Server beim einloggen erhalten und in cookie speichern
	static API_KEY = 'RnJhdW5ob2ZlcklQS1Zpc2lvblNlcnZpY2U=';
	static HASHED_KEY = CryptoJS.AES.encrypt(
		Storage.API_KEY,
		Storage.API_KEY,
		Storage.CONFIG
	);

	/**
	 *
	 * @param {*} value
	 */
	static hash = value => {
		const json = JSON.stringify(value);
		return CryptoJS.AES.encrypt(json, Storage.HASHED_KEY, Storage.CONFIG);
	};

	/**
	 *
	 * @param {*} value
	 */
	static unhash = value => {
		const string = value.toString();
		const bytes = CryptoJS.AES.decrypt(
			string,
			Storage.HASHED_KEY,
			Storage.CONFIG
		);
		const json = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(json);
	};

	/**
	 *
	 * @param {*} key
	 * @param {*} value
	 */
	set = (key, value) => {
		localStorage.setItem(Storage.hash(key), Storage.hash(value));
	};

	/**
	 *
	 * @param {*} key
	 */
	get = key => {
		const hashedKey = Storage.hash(key);
		const json = localStorage.getItem(hashedKey);

		if (json === null) return null;

		return Storage.unhash(json);
	};

	/**
	 *
	 * @param {*} key
	 */
	clear = (key = null) => {
		if (key === null) {
			localStorage.clear();
			return;
		}
		localStorage.removeItem(Storage.hash(key));
	};
}

export default Storage;
