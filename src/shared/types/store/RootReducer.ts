import ReduxReducer from "./reducer";
import { UserState } from "../../redux/user";
import { FoodTypeState } from "../../redux/foodType";
import { FormReducer, FormStateMap } from "redux-form";
export interface RootReduser {
	user: ReduxReducer<UserState>;
	foodType: ReduxReducer<FoodTypeState>;
	form: FormReducer;
}

export interface ReduxStoreState {
	user: UserState;
	foodType: FoodTypeState;
	form: FormStateMap;
}