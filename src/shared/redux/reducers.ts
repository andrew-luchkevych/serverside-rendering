import user from "./user";
import { RootReduser } from "../types/store/RootReducer";
import { reducer as form } from "redux-form";
const rootReducer: RootReduser = {
	user,
	form,
};

export default rootReducer;
