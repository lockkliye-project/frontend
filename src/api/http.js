/**
 * (C)reated by Burak Günaydin (2019)
 */
import axios from 'axios';
import https from 'https';

import { API } from 'config.js';

/* Only for development, DO NOT USE IN PRODUCTION */
const cert =
	'-----BEGIN CERTIFICATE-----MIIDjTCCAnWgAwIBAgIUX5BSEtmeHSmIruuq/a8hylCyhS0wDQYJKoZIhvcNAQELBQAwVjELMAkGA1UEBhMCREUxDzANBgNVBAgMBkJlcmxpbjEPMA0GA1UEBwwGQmVybGluMRcwFQYDVQQKDA5GcmF1bmhvZmVyIElQSzEMMAoGA1UECwwDSVBLMB4XDTE5MDcwMTA4MTMwOFoXDTIwMDYzMDA4MTMwOFowVjELMAkGA1UEBhMCREUxDzANBgNVBAgMBkJlcmxpbjEPMA0GA1UEBwwGQmVybGluMRcwFQYDVQQKDA5GcmF1bmhvZmVyIElQSzEMMAoGA1UECwwDSVBLMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwukMZrD0tXSx9caSkjkxbhoQgWS+gssxqEn3wd5iJM1Jp8nd0CTwZpUaxRjV55VbfRFQqTMRmI19IcRRqsL0BH793jMrOrdZFHQftNkJ5CFLO4R5Zqg2p0Ezlo5k9KdAz4AF7Q6B81/4AmVwpI5C6it71oqzXOdXQGIVwDQzFn8H0MKG58egTczCAV3ttHIwXJcb8hAhJVtcgC7HnNW0VMuzVjRI8C12gun5DOyUtfgWiW7C5F1k5KQwQpdhpcHINlEVrzQnwCVGrd3ampmm9j2xI6aE3oJqjD52cFRa7Iv3XNpQUNNCja5Wb0uadlAqIPE8uu5A85Y1NcEhhBbYQQIDAQABo1MwUTAdBgNVHQ4EFgQUCRWA3eeWHi2qBH4anUXwxQeJa6AwHwYDVR0jBBgwFoAUCRWA3eeWHi2qBH4anUXwxQeJa6AwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAhO1O8XR5WOPgjWj8ZhRHSwqBhHRm23LHNoaau4SpDqi54+KIFMS89ErpAm/4Mnm867CzIW+SFF8mJKNUuQsKCwLfpeWdLVwQ4GRPFo9rukuahogCVnBY6UDTROpLmlNQhMLtLyl39V5kSBY1m89104kjU2d+dTPNWvdtirCTKWfWLDODeoMXH2GffjfJZ2oA8kg9hvPkJOGVhJVnggDYO0Uznjvkg7zeN8i1kvO88jJOoXHsTE2fQkDve1cYxbR1GtnTJk5+5YZC9D+AIFZYvenuFNhwt+MHABN/rb19kT13pcQaZ/IcMKqjJWEjYLLvHF80BwzJ8Mq8V7R6hrYd1w==-----END CERTIFICATE-----';
const key =
	'-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDC6QxmsPS1dLH1xpKSOTFuGhCBZL6CyzGoSffB3mIkzUmnyd3QJPBmlRrFGNXnlVt9EVCpMxGYjX0hxFGqwvQEfv3eMys6t1kUdB+02QnkIUs7hHlmqDanQTOWjmT0p0DPgAXtDoHzX/gCZXCkjkLqK3vWirNc51dAYhXANDMWfwfQwobnx6BNzMIBXe20cjBclxvyECElW1yALsec1bRUy7NWNEjwLXaC6fkM7JS1+BaJbsLkXWTkpDBCl2Glwcg2URWvNCfAJUat3dqamab2PbEjpoTegmqMPnZwVFrsi/dc2lBQ00KNrlZvS5p2UCog8Ty67kDzljU1wSGEFthBAgMBAAECggEAAycJ0E9kZdrxVexUSpEqP4GkarNacXsf3nzzyOrz42x+mHwnXkp6qO4YdL+mFgzQYgF5sILm8fS35WfrejuU/s2fBY0GUfjNNAt8x8wK4Om48cl+vS5TU/k2AGVlNJ/P6ItFjUQCzhDrTf6eB8tVQbxaUGoF5KbJPn1XpLgza1WzbJaxkzeuzcBltUTs5K0J6STo7E0DHnThyc3hHrfRkEpQzZfFXMG0rwd/K76j2oxviMBxeJeMZVmvudLjHPA/81JNaz4SNRoM0ROFe3Ko8ZGgEv7stow65lxIYPZQsFNwcfe/ZlWmH3kiwBrL8ytUZeXzrcw65YwJFBG6ScAnAQKBgQDi9yc0VrjPu7HI6U8g46IM5I4oV/J7eDppTrUyveW3O7uNsAl4aUPdHoA4dBndM+ONNhrzZOprMv/KuL0kSZpWIzaS2vB1LfK6RgjacvZzAElm6aaoA9ZTYcikGKaMq4cWyaklpAbPVZehG7bdtZCIuetSN3ixzaCmawD8GGJbiQKBgQDb2CEUR1XQOWxALaQDfju1x4jvcgp3b01UHUS1kmTPqvbEGfQAs5NGIq3PRU53dmr6EK0dfzPxv6E9FUwBgfvCW/pz9yo6+27yDPFdJLR/QaacMJSz7MyWDqR+9myus/JWF34elGT5OjMnBPVT8jDC6s2BRp7uW1lkQtPdGAlQ+QKBgFItbMt9juLgMcnt99GPug/y/SnMViawbG3OqrrZmQAUJ59wmq03Z/P65DAMkYTPEdgCPBXedyYjTAxpgUpPQAtqKotXrHKxFU6upuv5bhRLiUgy1z3ETejY4d3QcxVB0eLFV3IihrixY/pYX4i9Ab0PnA2juhaevkkjOzML3SkJAoGBALKY5V6tCRjM3ZVRvrGbxnRJsoQbmEco46BW2q/LSxyuHiR3lRNQz28l0x/UhQdl60hVbd3NrexSKnIOMB31dAqUYGX/QI6EHsCDJT3vCLdtJSY0DUoSMK4jHR2LogVXaKLqGOpM0a7qyg2D6K2Wzmg7ClJghdLL4VYjOCygT0k5AoGBALGg42eLHhWXbMC5KZ5NPSOaG9KDVbjn/GW/GClvYhcM1js95nCVqsxsaTyodEQV3I0okysFTUIKe9vj2airx5jci3a+9BhDEpErGYTd2YOVlthjmzAGHcpZ6fglQA6+c4JBRdhcrPcDHf0Opfv1isJu8zwgitAAkPSXzHPqYwQc-----END PRIVATE KEY-----';
const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
	cert: cert,
	key: key,
	passphrase: 'YYY'
});
/**************************************************/

/**
 *
 */
const ENCODING = {
	SPACE: '+',
	TAB: '-',
	DOT: '_'
};

/**
 * The request-url that gets assembled together with the configuration-variables.
 *
 * Refactored for better readibility.
 */
const requestURL = (() => {
	/* A simple function to avoid D.R.Y. */
	const exists = (value, defaultValue) => {
		return value !== '' ? defaultValue : '';
	};

	let url = exists(API.sub, API.sub + '.'); // Applies subdomain
	url += API.protocol; // Applies http or https procotol
	url += API.url; // Applies the url
	url += exists(API.tld, '.' + API.tld); // Applies the top-level-domain
	url += exists(API.port, ':' + API.port); // Applies the port
	url += '/';
	url += exists(API.root, API.root + '/'); // Applies the backend-root-identifier

	return url;
})();

/**
 * Creating a request function through closure.
 *
 * @param {*} uri
 */
function request(uri) {
	/* */
	if (API.uri.indexOf(uri) === -1) return null;

	/**
	 *
	 * @param {*} id
	 */
	let url = (id = undefined) => {
		/* */
		return requestURL + uri + '/' + (id !== undefined ? id + '/' : '');
	};
	return url;
}

/**
 *
 * @param {String} jwt
 */
function setToken(jwt) {
	axios.defaults.headers.common['x-auth-token'] = jwt;
}

/**
 * If you only pass one argument, it's only going to encode the URL without snapping it
 *
 * @param {*} args
 */
export function encodeURL(...args) {
	let url = '';
	args.forEach(arg => {
		url += '/' + arg;
	});
	return url.replace(/\s+/gm, ENCODING.SPACE).toLowerCase();
}

/**
 *
 * @param {String} url
 */
export function decodeURL(url) {
	let uri = url.toString();
	let space = new RegExp('\\' + ENCODING.SPACE, 'gm');
	uri = uri.replace(space, ' ');
	return uri;
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	patch: axios.patch,

	setToken,
	request,

	httpsAgent
};
