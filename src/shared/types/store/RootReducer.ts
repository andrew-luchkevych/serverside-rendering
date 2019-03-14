import ReduxReducer from "./reducer";
import { UserState } from "../../redux/user";

export interface RootReduser {
	user: ReduxReducer<UserState>;
}

export interface ReduxStoreState {
	user: UserState;
}