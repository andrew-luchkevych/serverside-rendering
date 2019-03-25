import { reducer as form } from "redux-form";
import { RootReduser } from "../types/store/RootReducer";
import user from "./user";
import foodTypes from "./foodTypes";
import foodProviders from "./foodProviders";
import forceReloadData from "./forceReloadData";
import order from "./order";
import orderRoll from "./orderRoll";
const rootReducer: RootReduser = {
	form,
	user,
	foodTypes,
	foodProviders,
	forceReloadData,
	order,
	orderRoll,
};

export default rootReducer;
