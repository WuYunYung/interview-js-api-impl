import "../apply";

Function.prototype.customBind = function (context, ...args) {
	const fn = this;

	// biome-ignore lint/complexity/useArrowFunction: <explanation>
	return function (...innerArgs) {
		return fn.customApply(context, [...args, ...innerArgs]);
	};
};
