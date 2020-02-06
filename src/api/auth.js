/**
 * (C)reated by Burak Günaydin (2019)
 */
import jwtDecode from 'jwt-decode';
import http from './http.js';

const request = http.request('login');
const key = 'jwt';

http.setToken(getJWT());

// TODO: Switch clientside jwt-localStorage with serverside http-header http-only cookie to prevent XSS and CSRF-attacks
async function login(username, password) {
	const { data: jwt } = await http.post(request(), {
		username,
		password
	});
	localStorage.setItem(key, jwt);
	http.setToken(getJWT());
}

function loginWithJWT(jwt) {
	localStorage.setItem(key, jwt);
	http.setToken(getJWT());
}

function logout() {
	localStorage.removeItem(key);
}

function getLoggedInUser() {
	try {
		const jwt = localStorage.getItem(key);
		return jwtDecode(jwt);
	} catch (exception) {
		return null;
	}
}

function loggedIn() {
	return getLoggedInUser() !== null;
}

function getJWT() {
	return localStorage.getItem(key);
}

export default {
	login,
	loginWithJWT,
	logout,
	getLoggedInUser,
	loggedIn,
	getJWT
};
