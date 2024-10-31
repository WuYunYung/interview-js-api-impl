Function.prototype.customApply = function (context, args) {
	let innerContext = context;

	if (innerContext === null || innerContext === undefined) {
		innerContext = window;
	} else {
		innerContext = Object(context);
	}

	const key = Symbol("fn");

	innerContext[key] = this;

	let res;
	if (!args) {
		res = innerContext[key]();
	} else {
		res = innerContext[key](...args);
	}

	delete innerContext[key];

	return res;
};
