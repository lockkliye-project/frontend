/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */

class Matrix {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.internal = new Array(width * height);
	}
}

export default Matrix;
