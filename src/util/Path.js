function path(root, args) {
	let uri = '/' + root;
	args.forEach((arg) => {
		uri += '/' + arg;
	});
	return uri;
}

export function iconPath(...args) {
	return path('icon', args);
}

export function imagePath(...args) {
	return path('img', args);
}
