import ReduxReducer from "./reducer";
import { UserState } from "../../redux/user";
import { FoodTypesState } from "../../redux/foodTypes";
import { FormReducer, FormStateMap } from "redux-form";
export interface RootReduser {
	user: ReduxReducer<UserState>;
	foodTypes: ReduxReducer<FoodTypesState>;
	form: FormReducer;
}

export interface ReduxStoreState {
	user: UserState;
	foodTypes: FoodTypesState;
	form: FormStateMap;
}