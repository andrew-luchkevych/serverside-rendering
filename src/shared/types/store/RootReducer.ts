import { FormReducer, FormStateMap } from "redux-form";
import { UserState } from "../../redux/user";
import { FoodTypesState } from "../../redux/foodTypes";
import { FoodProvidersState } from "../../redux/foodProviders";
import { ForceReloadDataState } from "../../redux/forceReloadData";
import ReduxReducer from "./reducer";
export interface RootReduser {
	form: FormReducer;
	user: ReduxReducer<UserState>;
	foodTypes: ReduxReducer<FoodTypesState>;
	foodProviders: ReduxReducer<FoodProvidersState>;
	forceReloadData: ReduxReducer<ForceReloadDataState>;
}

export interface ReduxStoreState {
	form: FormStateMap;
	user: UserState;
	foodTypes: FoodTypesState;
	foodProviders: FoodProvidersState;
	forceReloadData: ForceReloadDataState;
}