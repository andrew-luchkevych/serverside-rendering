import { ReduxActionPayload } from "../types/store/action";

const createPayload = (data: any = {}, error: Error = undefined): ReduxActionPayload => {
	return {
		data,
		error,
	};
};

export default createPayload;