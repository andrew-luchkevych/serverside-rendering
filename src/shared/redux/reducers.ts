import user from "./user";
import foodType from "./foodType";
import { RootReduser } from "../types/store/RootReducer";
import { reducer as form } from "redux-form";
const rootReducer: RootReduser = {
	user,
	foodType,
	form,
};

export default rootReducer;
