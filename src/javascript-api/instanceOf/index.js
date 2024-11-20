function isRefType(target) {
	return ["object", "function"].includes(typeof target);
}

const customInstanceOf = (obj, target) => {
	if (!isRefType(target) || target === null) {
		throw new TypeError("Right-hand side of 'instanceof' is not an object");
	}

	if (!isRefType(obj)) {
		return false;
	}

	let current = obj;

	const constructorPrototype = target.prototype;

	while (current) {
		const proto = Object.getPrototypeOf(current);

		if (Object.is(proto, constructorPrototype)) {
			return true;
		}

		current = proto;
	}

	return false;
};

export default customInstanceOf;
