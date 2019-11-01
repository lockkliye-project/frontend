import axios from 'axios';

import { api } from 'config.js';

/**
 * The request-url that gets assembled together with the configuration-variables.
 */
const requestURL = (() => {
	/* A simple function to avoid D.R.Y. */
	const exists = (value, defaultValue) => {
		return value !== '' ? defaultValue : '';
	};

	let url = exists(api.sub, api.sub + '.'); // Applies subdomain
	url += api.protocol; // Applies http or https procotol
	url += api.url; // Applies the url
	url += exists(api.tld, '.' + api.tld); // Applies the top-level-domain
	url += exists(api.port, ':' + api.port); // Applies the port
	url += '/';
	url += exists(api.root, api.root + '/'); // Applies the backend-root-identifier

	return url;
})();

/**
 * @param {String} jwt
 */
function setToken(jwt) {
	axios.defaults.headers.common['x-auth-token'] = jwt;
}

/**
 * Creating a request function through closure.
 *
 * @param {*} uri
 */
function request(uri) {
	/**
	 *
	 * @param {*} id
	 */
	let url = (id = undefined) => {
		/* */
		return requestURL + api.uri[uri] + '/' + (id !== undefined ? id + '/' : '');
	};
	return url;
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	patch: axios.patch,

	setToken,
	request
};
