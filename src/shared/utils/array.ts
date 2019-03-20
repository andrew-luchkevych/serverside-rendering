export const findAndReplaceImmutable = <T>(
	replacer: T,
	arr: Array<T>,
	compareFunction: (value: T, index: number, obj: T[]) => boolean,
	compareFunctionContext?: any,
): Array<T> => {
	const tmp = [...arr];
	const index = tmp.findIndex(compareFunction, compareFunctionContext);
	if (index !== -1) {
		tmp[index] = replacer;
	}
	return tmp;
};

export const findAndRemoveImmutable = <T>(
	arr: Array<T>,
	compareFunction: (value: T, index: number, obj: T[]) => boolean,
	compareFunctionContext?: any,
): Array<T> => {
	const tmp = [...arr];
	const index = tmp.findIndex(compareFunction, compareFunctionContext);
	if (index !== -1) {
		tmp.splice(index, 1);
	}
	return tmp;
};

const ArrayUtils = {
	findAndReplaceImmutable,
	findAndRemoveImmutable,
};

export default ArrayUtils;