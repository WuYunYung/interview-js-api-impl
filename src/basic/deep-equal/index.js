function isRegExp(obj) {
	return obj instanceof RegExp;
}

function isDate(obj) {
	return obj instanceof Date;
}

function isObject(obj) {
	return typeof obj === "object";
}

function deepEqualImpl(obj1, obj2, visited = new WeakMap()) {
	if (visited.has(obj1)) {
		return visited.get(obj1) === obj2;
	}
	if (Object.is(obj1, obj2)) {
		return true;
	}

	if (isRegExp(obj1)) {
		if (!isRegExp(obj2)) return false;

		return obj1.source === obj2.source && obj1.flags === obj2.flags;
	}

	if (isDate(obj1)) {
		if (!isDate(obj2)) return false;

		return obj1.getTime() === obj2.getTime();
	}

	if (Array.isArray(obj1)) {
		if (!Array.isArray(obj2)) return false;

		if (obj1.length !== obj2.length) return false;

		return obj1.every((item, index) => {
			return deepEqualImpl(item, obj2[index]);
		});
	}

	if (isObject(obj1)) {
		if (!isObject(obj2)) return false;

		const obj1Keys = Object.keys(obj1);

		if (obj1Keys.length !== Object.keys(obj2).length) return false;

		visited.set(obj1, obj2);

		return obj1Keys.every((key) => {
			if (!Object.hasOwnProperty.call(obj2, key)) return false;

			return deepEqualImpl(obj1[key], obj2[key], visited);
		});
	}

	return false;
}

function deepEqual(obj1, obj2) {
	return deepEqualImpl(obj1, obj2);
}

export default deepEqual;
