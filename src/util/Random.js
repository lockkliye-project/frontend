class Random {
	number = (min, max, float = false) => {
		let r = min + (max - min) * Math.random();
		return float ? r : Math.floor(r);
	};

	/*
	 * A function to interpolate between a and b with t from [0, 1]
	 */
	interpolate = (a, b, t) => {
		return (1 - t) * a + t * b;
	};
}

export default Random;
