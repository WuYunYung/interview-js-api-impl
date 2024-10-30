Function.prototype.customCall = function (context, ...args) {
	const fn = this.bind(context);

	return fn(...args);
};
