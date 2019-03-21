import { reducer as form } from "redux-form";
import { RootReduser } from "../types/store/RootReducer";
import user from "./user";
import foodTypes from "./foodTypes";
import foodProviders from "./foodProviders";
import forceReloadData from "./forceReloadData";
const rootReducer: RootReduser = {
	form,
	user,
	foodTypes,
	foodProviders,
	forceReloadData,
};

export default rootReducer;
