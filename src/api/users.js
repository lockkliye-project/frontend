/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */
import http from './http.js';

const request = http.request('users');

/**
 *
 * @param {*} id
 */
function getCurrentUser(id) {
	return http.get(request(id));
}

/**
 *
 * @param {*} userData
 */
async function signup(userData) {
	return await http.post(request(), userData);
}

/**
 *
 * @param {*} userData
 */
async function login(userData) {
	return await http.patch(request(), userData);
}

/**
 *
 * @param {*} id
 * @param {*} newUserData
 */
async function edit(id, newUserData) {
	return await http.patch(request(id), newUserData);
}

export default {
	getCurrentUser,
	signup,
	login,
	edit
};
