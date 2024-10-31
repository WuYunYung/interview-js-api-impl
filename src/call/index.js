import "../bind";

Function.prototype.customCall = function (context, ...args) {
	const fn = this.customBind(context);

	return fn(...args);
};
