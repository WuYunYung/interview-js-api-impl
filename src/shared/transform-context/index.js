export const transformContext = (context) => {
	let innerContext = context;

	if (innerContext === null || innerContext === undefined) {
		innerContext = window;
	} else {
		innerContext = Object(context);
	}

	return innerContext;
};
