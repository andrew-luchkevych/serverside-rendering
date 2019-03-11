import { ActionPayload } from "../sharedProps/action";

const payload = (data: any = {}, error: Error = undefined): ActionPayload => {
	return {
		data,
		error,
	};
};

export default payload;