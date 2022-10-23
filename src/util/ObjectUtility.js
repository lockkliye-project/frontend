class ObjectUtility {
	static deepcopy = (object) => {
		let output, v, key;
		if (object === null) {
			output = null;
		} else {
			output = Array.isArray(object) ? [] : {};
		}
		for (key in object) {
			v = object[key];
			output[key] = typeof v === 'object' ? ObjectUtility.deepcopy(v) : v;
		}
		return output;
	};
}

export default ObjectUtility;
