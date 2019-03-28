import { ReduxActionPayload } from "../types/store/action";

const createPayload = <T = any>(data: T, error: Error = undefined): ReduxActionPayload<T> => {
	return {
		data,
		error,
	};
};

export default createPayload;