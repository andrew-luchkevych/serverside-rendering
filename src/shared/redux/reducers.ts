import user from "./user";
import foodTypes from "./foodTypes";
import { RootReduser } from "../types/store/RootReducer";
import { reducer as form } from "redux-form";
const rootReducer: RootReduser = {
	user,
	foodTypes,
	form,
};

export default rootReducer;
