/* Relative public ressource-paths. */
const src = {
	img: '/img',
	icon: '/icon',
	nav: '/icon/nav'
};

/* */
const breakpoints = {
	mobile: 500,
	tablet: 750
};

/* Debug flag, enables certain features for development
 */
export const DEBUG = true;

/* The barebone navigation of the web-application. */
export const nav = [];

/* */
export const color_codes = {};

/* The API-Url object, determing which ressources to make requests to */
export const api = {
	sub: '', // Subdomain'
	protocol: DEBUG ? 'http://' : window.location.protocol + '//',
	url: DEBUG ? 'localhost' : window.location.host,
	tld: '', // Top-level-domain
	port: DEBUG ? '1000' : '443',
	root: '',

	uri: {
		login: 'login',
		signup: 'signup'
	}
};

/**
 *
 *
 * @param {String} key
 */
export function getPath(key) {
	return src[key];
}

/**
 *
 *
 * @param {String} breakpoint
 */
export function breakpointHit(breakpoint) {
	return (
		window.innerWidth <= breakpoints[breakpoint] ||
		window.innerHeight <= breakpoints[breakpoint]
	);
}
