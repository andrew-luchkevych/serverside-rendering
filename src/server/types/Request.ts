import { Request } from "express";
import { ReduxStore, ReduxPersistor } from "../../shared/store";
export interface RequestWithStore extends Request {
	reduxStore?: ReduxStore;
	reduxPersistor?: ReduxPersistor;
}