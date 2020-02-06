/**
 * (C)reated by Burak Günaydin @ Fraunhofer IPK (2019)
 *
 * Main custom configuration file, easier to maintain and understand than plain .json files.
 */

/* */
const environment = process.env.NODE_ENV;

/* Relative src-paths. */
const SRC = {
	img: '/img',
	icon: '/icon',
	nav: '/icon/nav',
	sidebar: '/icon/sidebar',
	modules: '/icon/modules'
};

/* */
const BREAKPOINTS = {
	mobile: 500,
	tablet: 750
};

/* Debug flag, enables certain features for development
 *
 * !!! DON'T USE IN PRODUCTION !!!
 */
export const DEBUG = environment === 'development';

/*
 *
 */
export const API = {
	sub: '', // Subdomain, like 'api.', 'services.'
	protocol: DEBUG ? 'http://' : window.location.protocol + '//',
	url: DEBUG ? 'localhost' : window.location.host,
	tld: '', // Top-level-domain, e.g. '.de', '.com', '.org', '.net'
	port: DEBUG ? 8080 : 443,
	root: 'api',

	uri: ['register', 'login', 'workspace', 'settings']
};

/* The barebone navigation of the web-application.
 * Additional navigation-stubs may be served by the server.
 */
export const NAVIGATION = {};

/* */
export const COLOR_CODES = {};

/**
 *
 *
 * @param {String} key
 */
export function path(key) {
	return SRC[key];
}

/**
 *
 *
 * @param {String} breakpoint
 */
export function hitBreakpoint(breakpoint) {
	return (
		window.innerWidth <= BREAKPOINTS[breakpoint] ||
		window.innerHeight <= BREAKPOINTS[breakpoint]
	);
}
