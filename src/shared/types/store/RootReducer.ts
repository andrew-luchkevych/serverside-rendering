import ReduxReducer from "./reducer";
import { UserState } from "../../redux/user";
import { FormReducer, FormStateMap } from "redux-form";
export interface RootReduser {
	user: ReduxReducer<UserState>;
	form: FormReducer;
}

export interface ReduxStoreState {
	user: UserState;
	form: FormStateMap;
}