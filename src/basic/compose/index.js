function compos(...methods) {
	return (...args) => {
		return methods.reduce((result, method) => {
			return method(result);
		}, args);
	};
}

export default compos;
