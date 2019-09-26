const local = {
	set: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	},

	get: key => {
		return JSON.parse(localStorage.getItem(key));
	},

	clear: (key = null) => {
		if (key === null) {
			localStorage.clear();
			return;
		}
	}
};

const session = {
	set: (key, value) => {
		sessionStorage.setItem(key, JSON.stringify(value));
	},

	get: key => {
		return JSON.parse(sessionStorage.getItem(key));
	},

	clear: (key = null) => {
		if (key === null) {
			sessionStorage.clear();
			return;
		}
	}
};

export { local, session };
