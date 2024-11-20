import { transformContext } from "../shared/transform-context";

Function.prototype.customApply = function (context, args) {
	const innerContext = transformContext(context);

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
