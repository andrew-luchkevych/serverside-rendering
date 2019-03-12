import { Request } from "express";
import { ReduxStore } from "../../shared/store";
export interface RequestWithStore extends Request {
	reduxStore: ReduxStore;
}

export default RequestWithStore;